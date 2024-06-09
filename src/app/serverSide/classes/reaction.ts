import { Article } from "./article";
import { ReactionType } from "./reaction-type";
import { User } from "./user";

export interface Reaction {
  id: number;
  type: ReactionType;
  user: User;
  article: Article;
}
