import { UserModel, UserModelWithoutPassword } from '../model';

export interface IUserRepository {
  getUserByUsername(username: string): Promise<UserModel | null>;
  insertUser(user: UserModel): Promise<UserModelWithoutPassword>;
}
