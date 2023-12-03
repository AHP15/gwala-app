/* eslint-disable no-undef */
import DB from '../models/index.js';
import CustomError from '../utils/customError.js';
import { sendResetPasswordEmail } from '../utils/mailer.js';

import crypto from 'crypto';


const User = DB.user;

const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    const token = user.getJwtToken();

    const options = {
      expires: new Date(
        Date.now() + parseFloat(process.env.JWT_EXPIRE * 1000)
      ),
      httpOnly: true,
      sameSite: 'strict'
    };

    res.status(201).cookie('token', token, options).send({
      success: true,
      data: {
        message: 'user created',
        user
      },
      error: null,
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

const signin = async (req, res, next) => {
  try {
    if (!req.body.email) {
      throw new Error('Validation failed: No email address provided')
    }

    if (!req.body.password) {
      throw new Error('Validation failed: No password provided')
    }

    const user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user) {
      throw new Error(`user with email ${req.body.email} not found`);
    }

    const isPasswordCorrect = user.compatePasswords(req.body.password);

    if (!isPasswordCorrect) {
      throw new Error('Unauthorized: Incorrect Password');
    }

    const token = user.getJwtToken();

    const options = {
      expires: new Date(
        Date.now() + parseFloat(process.env.JWT_EXPIRE * 1000)
      ),
      httpOnly: true,
      sameSite: 'strict'
    };

    res.status(200).cookie('token', token, options).send({
      success: true,
      data: {
        user: { ...user, password: null }
      },
      error: null
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

const signout = async (req, res, next) => {
  try {
    res.clearCookie('token').send({
      success: true,
      data: {
        message: 'signed out!'
      },
      error: null
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).send({
      success: true,
      data: {
        user,
      },
      error: null,
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    if (!req.body.email) {
      throw new Error('Validation failed: No email address provided');
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error(`Not found: ${req.body.email} does not exist`);
    }

    const resetToken = user.generateResetToken();
    await user.save();

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    sendResetPasswordEmail(user.email, message);

    res.status(200).send({
      success: true,
      data: {
        message: `Email sent to ${user.email} .Please check your email`,
      },
      error: null
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Not found: Reset Password Token is invalid or has been expired');
    }

    if (req.body.password !== req.body.confirmPassword) {
      throw new Error('Validation failed: password and confirmPassword are not the same');
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).send({
      success: true,
      data: {
        message: 'Password has been reseted'
      },
      error: null
    });

  } catch (err) {
    next(new CustomError(err.message));
  }
};

export {
  signup,
  signin,
  getProfile,
  signout,
  forgotPassword,
  resetPassword
};
