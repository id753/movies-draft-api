import createHttpError from 'http-errors';
import Draft from '../models/draft.js';

// GET ALL
export const getDrafts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const { categoryId, search = '' } = req.query;

  const skip = (page - 1) * perPage;
  const draftQuery = Draft.find();

  //  Добавляем фильтры
  if (categoryId) {
    draftQuery.where('categoryId').equals(categoryId);
  }
  // поиск по тегу
  // if (search) {
  //   draftQuery.where({
  //     tags: { $regex: search, $options: 'i' },
  //   });
  // }

  // поиск по тегу и title и content
  if (search) {
    // Мы используем find() для добавления сложных условий в текущий запрос
    draftQuery.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  //   Выполняем запросы параллельно
  // Клонируем основной запрос для подсчета общего кол-ва БЕЗ учета лимитов страницы
  const [totalItems, drafts] = await Promise.all([
    draftQuery.clone().countDocuments(),
    draftQuery.clone().skip(skip).limit(perPage),
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
