import { UserModelWithoutPassword } from '@getfit/user';

export class UserPresenter {
  id: number;
  username: string;
  role: string;

  constructor(userDetail: UserModelWithoutPassword) {
    this.id = userDetail.id;
    this.username = userDetail.username;
    this.role = userDetail.role;
  }
}
