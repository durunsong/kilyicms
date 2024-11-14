export interface LoginRequestData {
  /** admin 或 user */
  user_name: "admin" | "user";
  /** 密码 */
  password: string;
}
