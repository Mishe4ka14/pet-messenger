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

// получаем необходимую информацию для списка чатов
export const getChatList = async (chatListIDs: string[], userId: string) => {
  try {
    if (!chatListIDs || chatListIDs.length === 0) {
      throw new Error('Необходимо передать идентификаторы чатов');
    }

    // Ищем чаты по идентификаторам с использованием агрегации
    const data = await Chat.aggregate([
      { $match: { _id: { $in: chatListIDs } } },
      { $unwind: '$users' },
      { $match: { users: { $ne: userId } } }, 
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          lastMessage: { $arrayElemAt: [{ $slice: ['$messages', -1] }, 0] }
        }
      },
      {
        $project: {
          _id: 1,
          user: { $arrayElemAt: ['$user', 0] },
          lastMessage: 1
        }
      },
      {
        $project: {
          _id: 1,
          userName: '$user.name',
          userAvatar: '$user.avatar',
          lastMessageText: '$lastMessage.text',
          lastMessageCreatedAt: '$lastMessage.createdAt'
        }
      }
    ]);

    const chats = data.map(chat => ({
      _id: chat._id,
      userName: chat.userName,
      userAvatar: chat.userAvatar,
      lastMessageText: chat.lastMessageText,
      lastMessageCreatedAt: chat.lastMessageCreatedAt 
    }));

    return chats;
  } catch (error) {
    console.error('Ошибка при получении списка чатов:', error);
    throw new Error('Ошибка при получении списка чатов');
  }
}

