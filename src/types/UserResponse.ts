import type { User } from "./User";

export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};