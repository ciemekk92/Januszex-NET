export interface IUser {
  id: Id;
  darkMode: boolean;
  userName: string;
  email: string;
  offerCount: number;
}

export interface ICurrentUser {
  user: IUser;
  roles: ('Admin' | 'Użytkownik')[];
}

export interface IUserForOffer {
  id: Id;
}
