import jwt from 'jsonwebtoken';

// בדיקה שהמשתמש מחובר
export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
// אם אין טוקן, אין הרשאה
  if (!token) {
    return res.status(401).json({ message: 'אין הרשאה — נא להתחבר' });
  }
// אימות הטוקן
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'טוקן לא תקין' });
  }
};

// בדיקה שהמשתמש הוא מנהל
export const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'אין הרשאת מנהל' });
  }
  next();
};