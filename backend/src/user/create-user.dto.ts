export class CreateUserDto {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: Date;
  pushToken?: string;
  tutorialReaded?: boolean;
}
