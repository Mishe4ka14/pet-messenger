import express from 'express';
import mongoose from 'mongoose';
import { createUser } from './controllers/user';

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/pet-mess-db');

const app = express();

app.use(express.json());

app.post('/register', createUser);

app.get('/', (req, res) => {
  res.send('HELLO! Это рабочий сервер Express!!!!!');
});

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
});
