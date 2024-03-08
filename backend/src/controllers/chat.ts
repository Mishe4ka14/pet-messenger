import { Request, Response, NextFunction } from 'express';
import Chat from '../models/chat';

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
      res.status(201).send(chat);
    })
    .catch((err: any) => {
      return res.status(500).json({ error: 'Ошибка при добавлении пользователя в чат' });
    });
};