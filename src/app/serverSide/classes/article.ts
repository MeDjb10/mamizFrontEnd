import { Chapter } from "./chapter";
import { Reaction } from "./reaction";

export interface Article {
  id: number;
  title: string;
  theme: string;
  description: string;
  mainPic: string;
  date: string;
  chapters?: Chapter[];
  reactions?: Reaction[];
}
