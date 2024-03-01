import express from 'express';
import mongoose from 'mongoose';
import { createUser } from './controllers/user';
import userRouter from './routes/user';

const cors = require('cors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/pet-mess-db');

const app = express();



app.use(cors());

app.use(express.json());

app.post('/signup', createUser);

app.get('/', (req, res) => {
  res.send('HELLO! Это рабочий сервер Express!!!!!');
});

app.use('/user', userRouter)

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
});
