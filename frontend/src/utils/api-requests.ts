import {
  IUser, IRegisterResponse, ISearchUser, ILoginInfo, IUpdateUserInfo, IChatOwners, IChatAndUserResponse,
} from '../services/types/types';

export const API_URL: string = 'https://api.hedwig.nomoredomainswork.ru';
export const WSS_URL: string = 'ws://api.hedwig.nomoredomainswork.ru';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const registerUser = async (userData: IUser) => fetch(`${API_URL}signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(userData),
}).then(checkResponse<IRegisterResponse>);

export const changeUser = async (userData: IUpdateUserInfo) => fetch(`${API_URL}user/me`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(userData),
}).then(checkResponse<IRegisterResponse>);

export const findUserByNameOrEmail = async (userData: ISearchUser) => {
  let url = `${API_URL}user/`;

  if (userData.name) {
    url += `?name=${userData.name}`;
  }

  if (userData.email) {
    url += `?email=${userData.email}`;
  }

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then(checkResponse<IUser>);
};

export const loginUserRequest = async (userData: ILoginInfo) => fetch(`${API_URL}login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(userData),
}).then(checkResponse<IUser>);

/* eslint-disable */
// ПРИ ДОБАВЛЕНИИ АУТЕНТИФИКАЦИИ ПОМЕНЯТЬ url И БРАТЬ ID ИЗ USER
export const createChatRequest = async (usersID: IChatOwners) => fetch(`${API_URL}chat/${usersID.firstID}/${usersID.secondID}`, { 
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}).then(checkResponse<any>);

export const getChatRequest = async (chatID: string | undefined, userID: string) => fetch(`${API_URL}chat/${chatID}?userID=${userID}`, { 
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}).then(checkResponse<IChatAndUserResponse>);
