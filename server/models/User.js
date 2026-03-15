import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  tz: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('User', userSchema);