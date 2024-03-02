import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  name: string,
  about: string,
  avatar: string
  email: string,
  password: string,
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) // eslint-disable-line no-unused-vars
  => Promise<Document<IUser> | null >;
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

// добавляем модели метод проверки почты
userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user: IUser) => {
      if (!user) {
        throw new Error('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error('Неправильные почта или пароль');
          }

          return user;
        });
    });
});

export default mongoose.model<IUser, UserModel>('user', userSchema);