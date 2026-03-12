import { Router } from 'express';
import {
  createDraft,
  deleteDraft,
  getDraftById,
  getDrafts,
  updateDraft,
} from '../controllers/draftsController.js';
import { celebrate } from 'celebrate';
import {
  createDraftSchema,
  draftIdParamSchema,
  updateDraftSchema,
} from '../validations/draftValidation.js';

const router = Router();

// GET ВСЕХ
router.get('/drafts', getDrafts);

// GET ОДНОГО
router.get('/drafts/:draftId', celebrate(draftIdParamSchema), getDraftById);

//POST
router.post('/drafts', celebrate(createDraftSchema), createDraft);

// delete
router.delete('/drafts/:draftId', celebrate(draftIdParamSchema), deleteDraft);

// update -  patch
router.patch('/drafts/:draftId', celebrate(updateDraftSchema), updateDraft);

export default router;
