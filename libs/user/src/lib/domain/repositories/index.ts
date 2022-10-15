import { UserModel, UserModelWithoutPassword } from '../model';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserModel>;
  insertUser(user: UserModel): Promise<UserModelWithoutPassword>;
}
