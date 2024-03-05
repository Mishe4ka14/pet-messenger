import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, avatar, about, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      avatar,
      about,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      about: user.about,
    }))
    .catch((err: any) => {
      return res.status(409).json({ error: 'Такой пользователь уже есть' });
    });
};


export const changeUserInfo = async (req: Request, res: Response) => {
  try {
    const {
      name, avatar, password, _id,
    } = req.body;

        // создаем объект с полями, которые будут обновлены
    const updatedFields: { [key: string]: any } = {};

    if (name) {
      updatedFields.name = name;
    }
    if (avatar) {
      updatedFields.avatar = avatar;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const newUser = await User.findByIdAndUpdate(_id, updatedFields, { new: true });

    res.status(200).json(newUser);
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userDoc = await User.findUserByCredentials(email, password);

    if (!userDoc) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Преобразуйте объект Document в обычный JavaScript объект
    const user = userDoc.toJSON();

    res.status(201).json({
      email: user.email,
      name: user.name,
      _id: user._id,
      avatar: user.avatar,
      about: user.about,
    });
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};
