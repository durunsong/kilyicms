export interface LoginRequestData {
  /** admin 或 user */
  userName: "admin" | "user";
  /** 密码 */
  password: string;
}
