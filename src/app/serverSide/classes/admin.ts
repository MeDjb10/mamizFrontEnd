export interface Admin {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string; // e.g., "ROLE_ADMIN"
}
