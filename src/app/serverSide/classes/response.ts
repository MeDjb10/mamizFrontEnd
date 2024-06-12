import { Medcin } from "./medcin";
import { Post } from "./post";

// response.ts
export interface Response {
  id: number;
  content: string;
  responseDate: string; 
  post: Post;
}
