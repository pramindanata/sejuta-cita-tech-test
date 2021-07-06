import { UserRole } from '@/domain';
import { model, Schema } from 'mongoose';

export interface UserModelDoc {
  _id: string;
  username: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<UserModelDoc>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<UserModelDoc>('users', schema);
