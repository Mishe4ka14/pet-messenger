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
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
      // select: false,
    },
  },
  { versionKey: false },

);

export default mongoose.model<IUser>('user', userSchema);