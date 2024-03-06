import {
  IUser, IRegisterResponse, ISearchUser, ILoginInfo, IUpdateUserInfo,
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

export const changeUser = async (userData: IUpdateUserInfo) => fetch('http://localhost:3000/user/me', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(userData),
}).then(checkResponse<IRegisterResponse>);

/* eslint-disable */
export const findUserByNameOrEmail = async (userData: ISearchUser) => {
  let url = 'http://localhost:3000/user/';

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
}

export const loginUserRequest = async (userData: ILoginInfo) => fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(userData),
}).then(checkResponse<IUser>);
