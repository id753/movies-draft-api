import createHttpError from 'http-errors';
import Draft from '../models/draft.js';

// GET ALL
export const getDrafts = async (req, res) => {
  const { page = 1, perPage = 10, categoryId } = req.query;
  const skip = (page - 1) * perPage;
  const draftQuery = Draft.find();

  // filter
  if (categoryId) {
    draftQuery.where('categoryId').equals(categoryId);
  }

  const [totalItems, drafts] = await Promise.all([
    draftQuery.clone().countDocuments(),
    draftQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);
  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    drafts,
  });
};
// const drafts = await Draft.find();
// res.status(200).json(drafts);

// GET ID
export const getDraftById = async (req, res, next) => {
  const { draftId } = req.params;
  const draft = await Draft.findById(draftId);
  if (!draft) {
    next(createHttpError(404, 'draft not found'));
    return;
  }
  res.status(200).json(draft);
};

// POST
export const createDraft = async (req, res) => {
  const draft = await Draft.create(req.body);
  res.status(201).json(draft);
};

// DELETE
export const deleteDraft = async (req, res, next) => {
  const { draftId } = req.params;
  const draft = await Draft.findOneAndDelete({
    _id: draftId,
  });
  if (!draft) {
    next(createHttpError(404, 'draft not found'));
    return;
  }
  res.status(200).json(draft);
};

// update
export const updateDraft = async (req, res, next) => {
  const { draftId } = req.params;
  const draft = await Draft.findOneAndUpdate({ _id: draftId }, req.body, {
    new: true,
  });
  if (!draft) {
    next(createHttpError(404, 'draft not found'));
    return;
  }
  res.status(200).json(draft);
};
