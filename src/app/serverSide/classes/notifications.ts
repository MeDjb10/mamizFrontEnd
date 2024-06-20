import { Medcin } from "./medcin";
import { Post } from "./post";
import { User } from "./user";

export interface Notification {
  id: number;
  content: string;
  readStatus: boolean;
  user: User;
  medcin: Medcin;
  post: Post;
  notificationDate: string; // or Date if you prefer
}
