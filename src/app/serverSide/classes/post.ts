import { User } from "./user";


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

