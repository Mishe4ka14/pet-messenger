import { JSX } from 'react';

export interface IProfileInfo {
  name?: string;
  about?: string;
  avatar?: string;
}

export interface IUpdateUserInfo extends Partial<IProfileInfo> {
  password?: string;
}

export type TextObject = { [name: string]: string };

export interface IMessage {
  text: string | TextObject;
  sender: string | undefined,
  createdAt: Date,
}

export interface IUser extends IProfileInfo {
  password: string;
  email: string;
  _id?: string;
  chats?: [];
  chatListData?: {
    userAvatar: string,
    userName: string,
    _id: string,
    lastMess: string
  }[];
}

export interface ISearchUser {
  name?: string;
  email?: string;
}

export interface ILoginInfo extends ISearchUser {
  password: string;
}

export interface IFoundUser extends ISearchUser {
  avatar: string
}

export interface IModal {
  onClose(): void;
  children: JSX.Element;
}

export interface IRegisterResponse {
  payload: IUser;
  error?: string;
  refreshToken: string;
  accessToken: string;
}

export type TUser = IUser | null;

export interface ISearchUserResponse {
  data: IUser | null;
}

export interface IChatOwners {
  firstID: string,
  secondID: string,
}

export interface IChat {
  users: {
    firstID: string,
    secondID: string
  }[],
  messages: IMessage[],
  _id: string
}

export interface IChatAndUserResponse {
  chat: {
    _id: string;
    users: string[];
    messages: IMessage[];
  };
  secondUser: {
    _id: string;
    name: string;
    about: string;
    avatar: string;
    email: string;
  };
}
