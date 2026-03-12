import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const createDraftSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      'any.required': 'Title is required',
    }),
    content: Joi.string().min(3).allow(''),
    categoryId: Joi.string().valid('0', '1', '2', '3', '4', '5').required(),
    userId: Joi.string(),
    tags: Joi.string().min(3).max(30).allow(''),
  }),
};

// кастомний валідатор для Joi, який перевірятиме значення на валідність ObjectId
const objectIdValidator = (value, helpers) => {
  // return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;

  //
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid id format');
  } else {
    return value;
  }
};

// Схема для перевірки параметра draftId
// Одинаковая для delete and update
export const draftIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    draftId: Joi.string().custom(objectIdValidator).required(),
  }),
};

// Валідація для PATCH
export const updateDraftSchema = {
  [Segments.PARAMS]: Joi.object({
    draftId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      'any.required': 'Title is required',
    }),
    content: Joi.string().min(3).allow(''),
    categoryId: Joi.string().valid('0', '1', '2', '3', '4', '5').required(),
    userId: Joi.string(),
    tags: Joi.string().min(3).max(30).allow(''),
  }).min(1),
};

export const getDraftsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(5).max(20),
    categoryId: Joi.string().valid('0', '1', '2', '3', '4', '5'),
    search: Joi.string().allow('').max(50),
  }),
};
