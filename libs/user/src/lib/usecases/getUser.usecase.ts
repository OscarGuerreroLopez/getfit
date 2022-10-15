import { UserModelWithoutPassword } from '../domain/model';
import { UserRepository } from '../domain/repositories';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userName: string): Promise<UserModelWithoutPassword> {
    return await this.userRepository.getUserByUsername(userName);
  }
}
