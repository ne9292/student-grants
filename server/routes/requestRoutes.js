import express from 'express';
import {
  addRequest,
  getAllRequests,
  getMyRequest,
  allowRequest,
  rejectRequest,
  getRequestById
} from '../controllers/requestController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
// כל הנתיבים תחת /api/requests
const router = express.Router();

// כל משתמש מחובר יכול להגיש בקשה חדשה ולראות את הבקשה שלו
router.post('/', requireAuth, addRequest);
router.get('/my/:tz', requireAuth, getMyRequest);

// רק מנהל
router.get('/', requireAuth, requireAdmin, getAllRequests);
router.put('/allow/:id', requireAuth, requireAdmin, allowRequest);
router.put('/reject/:id', requireAuth, requireAdmin, rejectRequest);


router.get('/:id', requireAuth, getRequestById);

export default router;