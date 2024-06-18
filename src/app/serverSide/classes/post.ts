import { User } from "./user";
import { Response } from "./response";

export interface Post {
  id: number;
  title: string;
  postDate: string;
  theme: string;
  question: string;
  responded: boolean;
  poid: number;
  taille: number;
  traitement: boolean;
  detailTrait : string;
  user: User;
  response?: Response | undefined;
}

