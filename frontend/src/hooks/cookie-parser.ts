import Cookies from 'js-cookie';

// Функция для получения данных из куки
const getUserFromCookie = <T>(cookieName: string): T | null => {
  const userCookie = Cookies.get(cookieName);
  return userCookie ? JSON.parse(userCookie) : null;
};

export default getUserFromCookie;
