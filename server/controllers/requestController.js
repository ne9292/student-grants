import Request from '../models/Request.js';
import User from '../models/User.js';
import { sendRequestConfirmation, sendRequestApproved, sendRequestRejected } from '../utils/mailer.js';

// הגשת בקשה חדשה
export const addRequest = async (req, res) => {
  try {
    const { personal, family, study, bank } = req.body;

    const newRequest = new Request({ personal, family, study, bank });
    await newRequest.save();

    // שליחת מייל אישור קבלה
    try {
      const user = await User.findOne({ tz: personal.tz });
      if (user?.email) {
        await sendRequestConfirmation(user.email, personal.firstName);
      }
    } catch (mailErr) {
      console.log('שגיאה בשליחת מייל:', mailErr.message);
    }

    res.status(201).json({ message: 'הבקשה נשמרה בהצלחה!', request: newRequest });

  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
};

// שליפת כל הבקשות (רק למנהל)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: { $ne: 'allow' } });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
};

// שליפת בקשה לפי ת.ז של משתמש
export const getMyRequest = async (req, res) => {
  try {
    const { tz } = req.params;
    const request = await Request.findOne({ 'personal.tz': tz }).sort({ createdAt: -1 });

    if (!request) {
      return res.status(404).json({ message: 'לא נמצאה בקשה' });
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
};

// אישור בקשה (רק למנהל)
export const allowRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndUpdate(id, { status: 'allow' }, { new: true });

    // שליחת מייל אישור
    try {
      const user = await User.findOne({ tz: request.personal.tz });
      if (user?.email) {
        await sendRequestApproved(user.email, request.personal.firstName);
      }
    } catch (mailErr) {
      console.log('שגיאה בשליחת מייל:', mailErr.message);
    }

    res.json({ message: 'הבקשה אושרה!' });
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
};

// דחיית בקשה (רק למנהל)
export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndUpdate(id, { status: 'reject' }, { new: true });

    // שליחת מייל דחייה
    try {
      const user = await User.findOne({ tz: request.personal.tz });
      if (user?.email) {
        await sendRequestRejected(user.email, request.personal.firstName);
      }
    } catch (mailErr) {
      console.log('שגיאה בשליחת מייל:', mailErr.message);
    }

    res.json({ message: 'הבקשה נדחתה' });
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
};

// שליפת בקשה לפי id
export const getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'בקשה לא נמצאה' });
        res.json(request);
    } catch (err) {
        res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
    }
};