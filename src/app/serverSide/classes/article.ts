import { ArticleType } from "../enum/article-type";
import { Chapter } from "./chapter";
import { Reaction } from "./reaction";

export interface Article {
  id: number;
  title: string;
  theme: ArticleType;
  description: string;
  mainPic: string;
  date: string;
  chapters?: Chapter[];
  reactions?: Reaction[];
}
