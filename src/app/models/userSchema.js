import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new mongoose.Schema({
  data: mongoose.Mixed,
  userName: {
    type: String,
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
  },
  role: {
    type: String,
    default: 'user',
  },
});

const User = models?.User || model('User', UserSchema);

export default User;
