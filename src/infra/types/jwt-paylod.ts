interface User {
  id: string;
}

export interface JwtPayload {
  user: User;
}
