import { User } from "./user";

export interface Depot {
  id: number;
  name: string;
  description: string;
  adresse: string;  
  status?: string;  
  price: number;
  depotDate:string;
  photos: string[];
  user: User;
}
