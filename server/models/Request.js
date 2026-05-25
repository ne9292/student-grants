import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  // פרטים אישיים
  personal: {
    tz: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String },
    adress: { type: String },
    phone: { type: String }
  },

  // פרטי משפחה
  family: {
    parentsNames: { type: String },
    amountOfChildren: { type: Number },
    amountOfChildrenOver19: { type: Number }
  },

  // פרטי לימודים
  study: {
    trend: { type: String },
    tuition: { type: Number },
    years: { type: Number }
  },

  // פרטי בנק
  bank: {
    accountOwner: { type: String },
    accountTz: { type: String },
    bankName: { type: String },
    branch: { type: String },
    accountNumber: { type: String }
  },

  // סטטוס
  status: {
    type: String,
    enum: ['waiting', 'allow', 'reject'],
    default: 'waiting'
  }

}, { timestamps: true });

export default mongoose.model('Request', requestSchema);