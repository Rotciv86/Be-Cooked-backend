import type { JwtPayload } from "jsonwebtoken";

export interface RegisterUserData {
  username: string;
  password: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
