export interface ILocation {
  street: string;
  postalCode: string;
  city: {
    name: string;
  };
  region: {
    name: string;
  };
}
