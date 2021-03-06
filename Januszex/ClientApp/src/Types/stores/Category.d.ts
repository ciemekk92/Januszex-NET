export interface ICategory {
  id: Id;
  name: string;
  created: string;
  parentId?: Id;
  parent?: ICategory;
  children?: ICategory[];
}

export interface ICategoryFlat {
  id: Id;
  name: string;
  created: string;
  parentId?: Id;
}
