import { User } from "./user";
import { Response } from "./response";

export interface Post {
  id: number;
  title: string; 
  postDate: string;
  theme: string;
  question: string;
  responded: boolean;
  user: User;
  response: Response;
}

