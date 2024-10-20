export interface SelectionMenuInterface {
  priorities: Array<{
    id: number;
    level: string;
  }>;
  statuses: Array<{
    id: number;
    name: string;
  }>;
  assignees: Array<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    imageSrc?: string | null;
  }>;
  tags: Array<{
    id: number;
    name: string;
  }>;
  projects: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

export interface SelectedValueInterface {
  value: number | string | Array<string | number>;
  label?: string | React.ReactNode;
  type: string;
}

// Define the interfaces for the props
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  imageSrc?: string | null;
}

interface Priority {
  id: number;
  level: string;
}

interface Status {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
}

// Define the props interface for the List component
export interface ListProps {
  id: number;
  priority: Priority;
  title: string;
  description: string;
  users: User[];
  status: Status;
  project: Project;
  tags: Tag[];
}

export type Option = {
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  value: string | number;
};

export type DropdownProps = {
  options: Array<Option>;
  label: string;
  onSelect: (option: Option) => void;
  icon?: React.ReactNode;
};

export type Recommendation = {
  label: string;
  colorCode: string;
};
