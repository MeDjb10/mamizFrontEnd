import { User } from "./user";

export interface Depot {
  id: number;
  name: string;
  description: string;
  price: number;
  photos: string[];
  user: User;
}
