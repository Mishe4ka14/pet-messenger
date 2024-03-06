import {
  IUser, IRegisterResponse, IUpdateInfo, ISearchUser,
} from '../../services/types/types';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const registerUser = async (userData: IUser) => fetch('http://localhost:3000/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(userData),
}).then(checkResponse<IRegisterResponse>);

export const changeUser = async (userData: IUpdateInfo) => fetch('http://localhost:3000/user/me', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(userData),
}).then(checkResponse<IRegisterResponse>);

/* eslint-disable */
export const findUserByNameOrEmail = async (userData: ISearchUser) => {
  let url = 'http://localhost:3000/user/';

  // Если предоставлено имя, добавляем его в URL
  if (userData.name) {
    url += `?name=${userData.name}`;
  }

  // Если предоставлен имейл и URL уже содержит параметры, добавляем его как дополнительный параметр
  if (userData.email) {
    url += `?email=${userData.email}`;
  }

  return fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}).then(checkResponse<IUser>);
}
