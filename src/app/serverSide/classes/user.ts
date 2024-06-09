import { Atelier } from "./atelier";
import { Reaction } from "./reaction";

export interface User {
  id: number;
  nom: string;
  prenom: string;
  motPasse: string;
  email: string;
  profilePic: string;
  numTel: string;
  medcin: boolean;
  ateliers?: Atelier[];
  reactions?: Reaction[];
}
