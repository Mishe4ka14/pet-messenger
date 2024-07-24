import { Request, Response } from 'express';
import Chat from '../models/chat';
import User from '../models/user';
import mongoose from 'mongoose';

// создаем новый чат
export const createChat = async (req: Request, res: Response) => {
  const { firstID, secondID } = req.params;

  if (!firstID || !secondID) {
    return res.status(400).json({ error: 'Необходимо указать идентификаторы обоих пользователей' });
  }

  try {
    let chat = await Chat.findOne({
      users: { $all: [firstID, secondID] }
    }).hint({ users: 1 });

    if (chat) {
      return res.status(200).json(chat);
    }

    chat = await Chat.create({
      users: [firstID, secondID],
      messages: []
    });

    if (!chat) {
      throw new Error('Ошибка при создании чата');
    }

    await Promise.all([
      User.findByIdAndUpdate(firstID, { $push: { chats: chat._id } }),
      User.findByIdAndUpdate(secondID, { $push: { chats: chat._id } })
    ]);

    res.status(201).json(chat);
  } catch (err) {
    return res.status(500).json({ error: 'Ошибка при создании чата' });
  }
};


// переходим в конкретный чат по ID
export const getChat = async (req: Request, res: Response) => {
  try {
    const { chatID } = req.params;
    const { userID } = req.query;

    const chat = await Chat.findById(chatID);
    if (!chat) {
      return res.status(404).json({ error: 'Чат не найден' });
    }

    const secondUserID = chat.users.find(id => id.toString() !== userID);
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


//находим в БД первые сообщения для списка чатов
export const getChatList = async (chatListIDs: string[], userId: string) => {
  try {
    if (!chatListIDs || chatListIDs.length === 0) {
      throw new Error('Необходимо передать идентификаторы чатов');
    }

    // Преобразуем chatListIDs в массив ObjectId
    const objectIdArray = chatListIDs.map(id => new mongoose.Types.ObjectId(id));

    // Ищем чаты по идентификаторам с использованием агрегации
    const data = await Chat.aggregate([
      { $match: { _id: { $in: objectIdArray } } },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'usersInfo'
        }
      },
      {
        $project: {
          _id: 1,
          users: 1,
          usersInfo: {
            $filter: {
              input: '$usersInfo',
              as: 'user',
              cond: { $ne: ['$$user._id', new mongoose.Types.ObjectId(userId)] }
            }
          },
          lastMessage: { $arrayElemAt: ['$messages', -1] }
        }
      },
      {
        $project: {
          _id: 1,
          userName: { $arrayElemAt: ['$usersInfo.name', 0] },
          userAvatar: { $arrayElemAt: ['$usersInfo.avatar', 0] },
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

// получаем список чатов и первых сообщений по переданным ID
export const handleGetChatList = async (req: Request, res: Response) => {
  try {
    const { chatListIDs, userId } = req.query;

    if (!chatListIDs || !userId) {
      return res.status(400).json({ error: 'chatListIDs и userId являются обязательными параметрами' });
    }

    const idsArray: string[] = (chatListIDs as string).split(',');
    const userIdString: string = userId as string;

    //получаем первые сообщения по ID
    const chats = await getChatList(idsArray, userIdString);

    return res.json(chats);
  } catch (error) {
    console.error('Ошибка при получении списка чатов:', error);
    return res.status(500).json({ error: 'Ошибка при получении списка чатов' });
  }
};
