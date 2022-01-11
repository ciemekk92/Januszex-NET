export interface ICategory {
  id: Id;
  name: string;
  created: string;
  parentId?: Id;
  parent?: {
    id: Id;
    name: string;
  };
}
