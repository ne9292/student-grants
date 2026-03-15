import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema({
    tz: { type: String, required: true, unique: true },
    personal: { type: Object, default: {} },
    family: { type: Object, default: {} },
    study: { type: Object, default: {} },
    bank: { type: Object, default: {} }
}, { timestamps: true });

export default mongoose.model('Draft', draftSchema);