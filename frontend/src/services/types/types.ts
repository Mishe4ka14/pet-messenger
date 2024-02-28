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

export interface IModal {
  onClose(): void;
  children: JSX.Element;
}
