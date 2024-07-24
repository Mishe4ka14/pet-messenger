// websocket-server.ts
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { processAndSaveMessage } from '../controllers/chat-socket';

const clients = new Map<string, WebSocket[]>();

export function setupWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
    const url = req.url || ''; // Задаем значение по умолчанию для url
    const chatID = new URL(url, `http://${req.headers.host}`).pathname.split('/').pop();

    if (!chatID) {
      ws.close(); // Закрываем соединение, если chatID неопределен
      return;
    }

    if (!clients.has(chatID)) {
      clients.set(chatID, []);
    }

    // Добавляем нового клиента в список клиентов для этого чата
    clients.get(chatID)!.push(ws);

    console.log('WebSocket connection established!!!');

    // Обработка сообщений от клиента
    ws.on('message', async (message: string) => {
      console.log(`Received message: ${message}`);
      try {
        const newMessage = await processAndSaveMessage(message);

        // Отправляем сообщение всем клиентам, подключенным к этому чату
        clients.get(chatID)!.forEach((client: WebSocket) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(newMessage));
          }
        });
      } catch (error) {
        console.error('Ошибка при обработке и сохранении сообщения:', error);
      }
    });

    // Удаление клиента из списка при закрытии соединения
    ws.on('close', () => {
      const chatClients = clients.get(chatID) || [];
      clients.set(chatID, chatClients.filter(client => client !== ws));
      console.log('WebSocket connection closed');
    });
  });
}