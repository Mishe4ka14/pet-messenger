import { Request, Response } from 'express';
import Chat from '../models/chat';
import User from '../models/user';

export const createChat = async (req: Request, res: Response) => {
  const { firstID, secondID } = req.params;

  if (!firstID || !secondID) {
    return res.status(400).json({ error: 'Необходимо указать идентификаторы обоих пользователей' });
  }

  try {
    //проверка на существование чата между пользователями
    let chat = await Chat.findOne({
      users: { $all: [firstID, secondID] }
    }).hint({ users: 1 }); 

    if (chat) {
      return res.status(200).json(chat);
    }

    // создание нового чата
    chat = await Chat.create({
      users: [firstID, secondID],
      messages: []
    });

    if (!chat) {
      throw new Error('Ошибка при создании чата');
    }

    // обновление списков чатов у пользователей
    await Promise.all([
      User.findByIdAndUpdate(firstID, { $push: { chats: chat._id } }),
      User.findByIdAndUpdate(secondID, { $push: { chats: chat._id } })
    ]);

    res.status(201).json(chat);
  } catch (err) {
    return res.status(500).json({ error: 'Ошибка при создании чата' });
  }
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