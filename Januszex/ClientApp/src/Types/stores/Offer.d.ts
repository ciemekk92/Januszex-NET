import { ILocation } from './Location';
import { ICategory } from './Category';
import { IUserForOffer } from './User';

export interface IOffer {
  id: Id;
  title: string;
  content: string;
  created: string;
  isActive: boolean;
  location: ILocation;
  user: IUserForOffer;
  categories: ICategory[];
}
