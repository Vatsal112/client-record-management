// types/index.ts

export interface IClient {
  id: number;
  name: string;
  email: string;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ISearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export interface IClientTableProps {
  clients: IClient[];
  onEdit?: (client: IClient) => void;
  onDelete: (id: number) => void;
  onSave: (client: IClient) => void;
}

export interface IFileUploadProps {
  onUpload: (clients: IClient[]) => void;
}
