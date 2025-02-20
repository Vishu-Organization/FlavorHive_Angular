import { Loader } from '../home/_interfaces';

export interface SharedState {
  blog: BlogState;
  emailSignup: EmailSignupState;
}

export interface BlogState extends Loader {
  data: BlogRecipe | null;
}

export interface EmailSignupState extends Loader {
  data: boolean| null;
}

export type BlogResponse = {
  recipes: BlogRecipe[];
};

export type BlogRecipe = {
  image: string;
  sourceUrl: string;
  title: string;
};
