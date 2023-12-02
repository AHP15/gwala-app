/* eslint-disable no-undef */
import DB from '../models/index.js';
import CustomError from '../utils/customError.js';


const User = DB.user;

const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    const token = user.getJwtToken();

    const options = {
      expires: new Date(
        Date.now() + parseFloat(process.env.JWT_EXPIRE * 1000)
      ),
      httpOnly: true
    };

    res.status(201).cookie('token', token, options).send({
      success: true,
      data: {
        message: 'user created',
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
      httpOnly: true
    };

    res.status(200).cookie('token', token, options).send({
      success: true,
      data: {},
      error: null
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

export { signup, signin };
