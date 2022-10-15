import { UserModel, UserModelWithoutPassword } from '../model';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserModelWithoutPassword>;
  insertUser(user: UserModel): Promise<UserModelWithoutPassword>;
}
