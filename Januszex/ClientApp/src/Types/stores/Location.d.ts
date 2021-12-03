export interface ILocation {
  id: Id;
  street: string;
  postalCode: string;
  city: {
    id: string;
    name: string;
  };
  region: {
    id: string;
    name: string;
  };
}
