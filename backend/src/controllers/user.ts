import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';


export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name, avatar, about, password, email,
    } = req.body;

    // Проверка наличия обязательных полей
    // if (!name || !password || !email) {
    //   return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
    // }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      avatar,
      about,
    });

    // Отправка созданного пользователя в ответе
    res.status(201).json(user);
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};
