export interface OptionNode {
  label: string;
  value: string;
  children?: OptionNode[];
  depth: number;
}

export interface PaginationProps {
  TotalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
  HasNext: boolean;
  HasPrevious: boolean;
}

export interface FilterParams {
  categoryId: Id;
  orderBy: string;
}

export interface IconProps {
  size?: number;
}
