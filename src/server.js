import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import { Draft } from './models/draft.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger); // 1. Логер першим — бачить усі запити // Логування запитів
app.use(express.json()); // Middleware для парсингу JSON
app.use(cors()); // Дозволяє запити з будь-яких джерел

// GET ВСЕХ
app.get('/drafts', async (req, res) => {
  const drafts = await Draft.find();
  res.status(200).json(drafts);
});
// GET ОДНОГО
app.get('/drafts/:id', async (req, res) => {
  const { id } = req.params;
  const draft = await Draft.findById(id);
  if (!draft) {
    return res.status(404).json({ message: 'draft not found' });
  }
  res.status(200).json(draft);
});

// Middleware 404
app.use(notFoundHandler);

// Middleware для обробки помилок
app.use(errorHandler);

await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
