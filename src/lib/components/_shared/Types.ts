export interface ICompetition {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  picture: string;
  cover: string;
  tags: string[];
  incentive: string;
  category: string;
}

export interface IUser {
  displayName: string;
  email: string;
  password?: string;
  cover?: string;
  picture?: string;
  bio?: string;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  cover: string;
  picture: string;
}
