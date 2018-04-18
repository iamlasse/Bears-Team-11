export interface Projects {
  _id?: string;
  name?: string;
  creator?: string;
  images?: string[];
  team?: object[] | object;
  description?: string;
  contact?: string;
  lookingFor?: string[];
  comments?: string | Array<string>; // Need to update all dependents
  createdAt?: number;
  dueDate?: number | any;
  views?: number;
  category?: string;
  status?: boolean;
  upVotes?: number;
  githubLink?: string;
  mockupLink?: string;
  liveLink?: string;
  tags?: string[];
  files?: any;
}

export type Project = Projects;

// State is used to declare any types in the this.state object
export interface State {}

// Props is to declare any types of props passed in from parent react container
// In this case, there are no props passed in, so its an empty object
export interface Props {
  project: Projects;
  index?: number;
}

export interface EmptyProp {}

export interface ProjectsProps {}

export interface ProjectsInheritedProps {
  count: number;
}
export interface ProjectsState {}
