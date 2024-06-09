import { User } from "./user";

export interface Post {
  id: number;
  theme: string;
  question: string;
  response: string;
  responded: boolean;
  user: User;
}
