import { Request, Response } from 'express';
import Chat from '../models/chat';
import User from '../models/user';

export const createChat = (req: Request, res: Response) => {
  const { firstID, secondID } = req.params;

  if (!firstID || !secondID) {
    return res.status(400).json({ error: 'Необходимо указать идентификаторы обоих пользователей' });
  }

  Chat.create({
    users: [firstID, secondID],
    messages: []
  })
    .then((chat) => {
      if (!chat) {
        throw new Error('Ошибка при создании чата');
      }
      res.status(201).json({ _id: chat._id });
    })
    .catch((err: any) => {
      return res.status(500).json({ error: 'Ошибка при добавлении пользователя в чат' });
    });
};

export const getChat = async (req: Request, res: Response) => {
  try {
    const { chatID } = req.params;

    const chat = await Chat.findById(chatID);
    if (!chat) {
      return res.status(404).json({ error: 'Чат не найден' });
    }

    const secondUserID = chat.users[1]; // Получаем айди второго пользователя

    const secondUser = await User.findById(secondUserID);
    if (!secondUser) {
      return res.status(404).json({ error: 'Второй пользователь не найден' });
    }

    return res.status(200).json({ chat, secondUser });

  } catch (error: any) {
    console.error('Ошибка при поиске чата:', error.message);
    return res.status(500).json({ error: 'Ошибка при поиске чата' });
  }
};