import { ILocation } from './Location';
import { ICategory } from './Category';
import { IUserForOffer } from './User';
import { Photo } from './Photo';

export interface IOffer {
  id: Id;
  title: string;
  content: string;
  created: string;
  isActive: boolean;
  price: number;
  location: ILocation;
  user: IUserForOffer;
  photos?: Photo[];
  categories?: ICategory[];
  categoryIds?: Id[];
}

export interface IOfferForCreation {
  id: Id;
  title: string;
  content: string;
  created: string;
  isActive: boolean;
  price: number;
  location: ILocation;
  user: IUserForOffer;
  categoryIds: Id[];
  photos: Photo[];
}
