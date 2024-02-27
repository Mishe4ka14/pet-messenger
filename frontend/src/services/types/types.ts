export interface TextObject {
  [name: string]: string;
}

export interface IMessage {
  _id: string;
  text: string | TextObject;
  owner: string;
  isMine: boolean;
}
