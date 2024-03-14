import mongoose, { Document, Model } from 'mongoose';
import User from './user';

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
    ref: 'User'
  }],
  messages: [{
    text: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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

chatSchema.index({ users: 1 });

export default mongoose.model<IChat>('Chat', chatSchema);