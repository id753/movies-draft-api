import { Router } from 'express';
import {
  createDraft,
  deleteDraft,
  getDraftById,
  getDrafts,
  updateDraft,
} from '../controllers/draftsController.js';

const router = Router();

// GET ВСЕХ
router.get('/drafts', getDrafts);

// GET ОДНОГО
router.get('/drafts/:draftId', getDraftById);

//POST
router.post('/drafts', createDraft);

// delete
router.delete('/drafts/:draftId', deleteDraft);

// update -  patch
router.patch('/drafts/:draftId', updateDraft);

export default router;
