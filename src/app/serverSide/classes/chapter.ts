import { Article } from "./article";

export interface Chapter {
  id: number;
  title: string;
  description: string;
  photo: string;
  article?: Article;
}
