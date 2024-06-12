import { Medcin } from "./medcin";
import { Post } from "./post";


export interface Response {
  id: number;
  content: string;
  responseDate: string; 
  medcin: Medcin;
  post: Post;
}
