export interface JwtPayload {
  isVerified: boolean;
  sub: string; // Typically the userId
  role: string; // Role of the user
  _id: string;
}
