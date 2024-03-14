import Chat from "../models/chat";

export async function processAndSaveMessage(message: any) {
  try {
    const parsedMessage = JSON.parse(message);
    const { chatID, text, sender } = parsedMessage;

    const chat = await Chat.findById(chatID);
    if (!chat) {
      console.error('Чат не найден');
      return;
    }

    const newMessage = {
      text,
      sender,
      createdAt: new Date(),
    };

    chat.messages.push(newMessage);
    await chat.save();
    console.log('Сообщение успешно добавлено в чат');
    
    return newMessage;
  } catch (error) {
    console.error('Ошибка при обработке и сохранении сообщения:', error);
  }
}