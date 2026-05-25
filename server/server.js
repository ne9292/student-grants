import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import requestRoutes from './routes/requestRoutes.js'
import draftRoutes from './routes/draftRoutes.js'

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/drafts', draftRoutes);

// route בדיקה
app.get('/api/health', (req, res) => {
  res.json({ message: 'השרת עובד! ✅' });
});

// חיבור ל-MongoDB והפעלת השרת
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB מחובר בהצלחה');
    app.listen(PORT, () => {
      console.log(`✅ השרת רץ על פורט ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ שגיאה בחיבור ל-MongoDB:', err.message);
  });