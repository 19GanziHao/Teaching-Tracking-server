export class LoginResponseDto {
  token: string;

  /** 用户ID */
  userId: number;

  /** 用户名 */
  name: string;

  /** 邮箱 */
  email: string;

  /** 角色 */
  roles: string[];
}
