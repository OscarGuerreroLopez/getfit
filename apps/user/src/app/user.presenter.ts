import { UserModelWithoutPassword } from '@getfit/user';

export class UserPresenter {
  id: number;
  username: string;

  constructor(userDetail: UserModelWithoutPassword) {
    this.id = userDetail.id;
    this.username = userDetail.username;
  }
}
