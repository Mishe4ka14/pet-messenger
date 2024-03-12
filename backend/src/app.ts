import express from 'express';
import mongoose from 'mongoose';
import { createUser, loginUser } from './controllers/user';
import userRouter from './routes/user';
import chatRouter from './routes/chat';
import { Server as WebSocketServer } from 'ws';
import http from 'http'; 
import { processAndSaveMessage } from './controllers/chat-socket';

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

// Создаем HTTP-сервер с использованием Express
const server = http.createServer(app);

// Создаем WebSocket-сервер, привязанный к HTTP-серверу
const wss = new WebSocketServer({ server });

// Слушаем входящие соединения WebSocket
wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  // Обработка сообщений от клиента
  ws.on('message', async (message) => {
    console.log(`Received message: ${message}`);
    try {
      await processAndSaveMessage(message);
    } catch (error) {
      console.error('Ошибка при обработке и сохранении сообщения:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});



server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
