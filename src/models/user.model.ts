import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { UserInstance, UserCreationAttributes } from '../interface';
class User extends Model <UserInstance, UserCreationAttributes> implements UserInstance {
  id!: number;
  email!: string;
  password!: string; 
  role!: string;
}
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

export default User;
