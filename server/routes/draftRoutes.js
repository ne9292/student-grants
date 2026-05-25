import express from 'express';
import { saveDraft, getDraft, deleteDraft } from '../controllers/draftController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// כל הנתיבים מוגנים — רק משתמש מחובר יכול לגשת
router.post('/', requireAuth, saveDraft);    // שמירה
router.get('/', requireAuth, getDraft);      // שליפה
router.delete('/', requireAuth, deleteDraft); // מחיקה

export default router;