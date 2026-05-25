import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// הרשמה
export const register = async (req, res) => {
  try {
    const { tz, firstName, lastName, password, email } = req.body;

    // בדיקה שהת.ז לא קיימת כבר
    const exists = await User.findOne({ tz });
    if (exists) {
      return res.status(400).json({ message: 'משתמש עם ת.ז זו כבר קיים' });
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // שמירה ב-MongoDB
    const newUser = new User({ tz, firstName, lastName, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: 'המשתמש נרשם בהצלחה!' });

  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
};

// כניסה
export const login = async (req, res) => {
  try {
    const { tz, password } = req.body;

    // חיפוש משתמש לפי ת.ז
    const user = await User.findOne({ tz });
    if (!user) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    // בדיקת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'סיסמה שגויה' });
    }

    // יצירת JWT token
    const token = jwt.sign(
      { tz: user.tz, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        tz: user.tz,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
};
// קבלת פרטי המשתמש המחובר
export const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ tz: req.user.tz }).select('-password');
        if (!user) return res.status(404).json({ message: 'משתמש לא נמצא' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
    }
};