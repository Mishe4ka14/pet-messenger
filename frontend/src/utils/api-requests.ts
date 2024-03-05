import { IUser, IRegisterResponse, IUpdateInfo } from '../services/types/types';

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
