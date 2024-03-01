import mongoose, { Document, Model } from 'mongoose';

interface IUser {
  name: string,
  about: string,
  avatar: string
  email: string,
  password: string,
}

const validator = require('validator');

export const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      default: 'Luna Lovegood',
    },
    about: {
      type: String,
      default: 'Always without shoose',
    },
    avatar: {
      type: String,
      default: 'https://yobte.ru/uploads/posts/2019-11/polumna-lavgud-42-foto-1.jpg',
      validate: {
        validator(v: string) {
          return /^(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(v);
        },
        message: 'Некорректная ссылка на аватар',
      },
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'Некорректный Email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },

);

export default mongoose.model<IUser>('user', userSchema);