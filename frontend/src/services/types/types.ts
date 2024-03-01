import { JSX } from 'react';

export interface TextObject {
  [name: string]: string;
}

export interface IMessage {
  _id: string;
  text: string | TextObject;
  owner: string;
  isMine: boolean;
}

export interface IUser {
  name?: string,
  password: string,
  email: string,
  about?: string,
  avatar?: string,
}

export interface IUpdateInfo {
  name?: string,
  password?: string,
  avatar?: string,
}

export interface IModal {
  onClose(): void;
  children: JSX.Element;
}

export interface IRegisterResponse {
  email: string,
  password: string,
  name: string,
  about: string,
  _id: string,
  avatar: string,
}

export interface IUpdateUserResponse {
  password?: string,
  name?: string,
  _id?: string,
  avatar?: string,
}

export type TUser = IUser | null;
