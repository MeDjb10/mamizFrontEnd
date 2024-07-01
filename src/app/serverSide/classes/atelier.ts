import { User } from "./user";

export interface Atelier {
  id: number;
  title: string;
  description: string;
  photo: string;
  date: string;
  place: string;
  price: number;
  maxPlaces: number;
  photoURL: string;
}
