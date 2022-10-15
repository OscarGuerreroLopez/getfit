import { UserModel, UserModelWithoutPassword } from '../domain/model';
import { UserRepository } from '../domain/repositories';

export class AddUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userDetail: UserModel): Promise<UserModelWithoutPassword> {
    const result = await this.userRepository.insertUser(userDetail);
    return result;
  }
}
