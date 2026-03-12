import { Schema, model } from 'mongoose';

const draftSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String,
      // required: [true, 'Content is required'],
    },
    categoryId: {
      type: String,
      required: true,
      enum: ['0', '1', '2', '3', '4', '5'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Ссылка на модель User
      // required: true,
    },
    tags: {
      type: String, // В твоем типе Draft это строка
      default: '',
    },
  },
  {
    timestamps: true, // Автоматически создаст createdAt и updatedAt
    versionKey: false, // Убирает поле __v
  },
);

// Создаем модель (с проверкой, чтобы не пересоздавать ее при Hot Reload в Next.js)
export const Draft = model('Draft', draftSchema);

export default Draft;
