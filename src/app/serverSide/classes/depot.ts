import { User } from "./user";

export interface Depot {
  id: number;
  name: string;
  description: string;
  adresse: string;
  price: number;
  depotDate:string;
  photos: string[];
  user: User;
}
