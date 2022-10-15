export class UserModelWithoutPassword {
  id?: number;
  username!: string;
}

export class UserModel extends UserModelWithoutPassword {
  password!: string;
}
