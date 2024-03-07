import express from 'express';
import mongoose from 'mongoose';
import { createUser, loginUser } from './controllers/user';
import userRouter from './routes/user';
import Chat from './models/chat';

const cors = require('cors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/pet-mess-db');

const app = express();



app.use(cors());

app.use(express.json());

app.post('/signup', createUser);
app.post('/login', loginUser);

app.get('/', (req, res) => {
  res.send('HELLO! Это рабочий сервер Express!!!!!');
});

app.use('/user', userRouter)

// const chat = new Chat({
//   users: ['65e7dcb39e76704c1ac63c99', '65e8e1c87d936582a3177a0f'], // ID пользователей чата
//   messages: [
//     { text: 'Привет, как дела?', sender: '65e7dcb39e76704c1ac63c99' },
//     { text: 'Привет, всё хорошо, спасибо!', sender: '65e8e1c87d936582a3177a0f' },
//   ],
// });

// // Сохранение чата в коллекцию
// chat.save()
//   .then((savedChat) => {
//     console.log('Чат успешно сохранен:', savedChat);
//   })
//   .catch((error) => {
//     console.error('Ошибка при сохранении чата:', error);
//   });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
