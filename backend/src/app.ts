import express from 'express';
import mongoose from 'mongoose';
import { createUser, loginUser } from './controllers/user';
import userRouter from './routes/user';
import chatRouter from './routes/chat'
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

app.use('/user', userRouter);

app.use('/chat', chatRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
