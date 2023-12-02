/* eslint-disable no-undef */
import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'User email is required'],
    validate: [validator.isEmail, 'Invalid email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.compatePasswords = function (clientPassword) {
  return bcrypt.compareSync(clientPassword, this.password);
}


userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: parseFloat(process.env.JWT_EXPIRE)
  });
}

// Generate a reset password token
userSchema.methods.getResetPasswordToken = function () {

  // Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // Expire after 24 hours
  this.resetPasswordExpire = Date.now() + 86400 * 1000;

  return resetToken;
}

const User = mongoose.model('User', userSchema);

export default User;