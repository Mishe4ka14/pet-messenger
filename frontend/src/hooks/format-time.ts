/* eslint-disable no-else-return */
// функция форматирования времени
const formatTime = (dateStr: string | Date): string => {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    // если сегодняшняя дата, возвращаем время в формате "HH:MM"
    return date.toTimeString().substring(0, 5);
  } else {
    // если не сегодняшняя дата, возвращаем дату в формате "DD.MM"
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  }
};

export default formatTime;
