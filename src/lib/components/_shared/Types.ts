interface ICompetition {
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

interface IUser {
  displayName: string;
  email: string;
}
