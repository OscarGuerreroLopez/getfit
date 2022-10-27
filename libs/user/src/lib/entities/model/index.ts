export class UserModelWithoutPassword {
  id?: number;
  username!: string;
  role!: string;
}

export class UserModel extends UserModelWithoutPassword {
  password!: string;
}
