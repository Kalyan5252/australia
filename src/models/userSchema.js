import mongoose, { Schema, model, models } from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  data: mongoose.Mixed,
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  abn: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    select: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  password: {
    type: String,
    default: '1234',
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

UserSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 20 * 60 * 1000;
  await this.save({ validateBeforeSave: false });
  return resetToken;
};

const User = models?.User || model('User', UserSchema);

export default User;
