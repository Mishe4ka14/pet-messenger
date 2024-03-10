import mongoose, { Document, Model } from 'mongoose';
import user from './user';

interface IMessage {
  text: string,
  sender: mongoose.Types.ObjectId,
  createdAt?: Date;
  isRead?: boolean;
}

interface IChat extends Document {
  users: mongoose.Types.ObjectId[],
  messages: IMessage[],
}

const chatSchema = new mongoose.Schema<IChat>({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    id: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  messages: [{
    text: String,
    sender: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    createdAt: {
       type: Date,
      default: Date.now
     },
    isRead: Boolean,
  }],
},
  { versionKey: false },
)

export default mongoose.model<IChat>('Chat', chatSchema);