import { User } from './user.interface';

export interface Post {
  title: string;

  content: string;

  description: string;

  pic: string;

  author: User;

  _id: string;

  createdAt: Date;
}
