import { ReactionType } from "../enum/reaction-type";
import { Article } from "./article";

import { User } from "./user";

export interface Reaction {
  id: number;
  type: ReactionType;
  user: User;
  article: Article;
}
