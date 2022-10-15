import { UserModelWithoutPassword } from '../entities/model';
import { UserRepository } from '../entities/repositories';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userName: string): Promise<UserModelWithoutPassword> {
    return await this.userRepository.getUserByUsername(userName);
  }
}
