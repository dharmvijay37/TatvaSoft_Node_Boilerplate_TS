import { Optional } from 'sequelize';
export interface UserInstance {
  id: number;
  email: string;
  password: string;
  role: string;
}

export type UserCreationAttributes = Optional<UserInstance, 'id'>;
