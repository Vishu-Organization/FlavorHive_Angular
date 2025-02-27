import { Loader } from '../home/_interfaces';

export interface SharedState {
  blog: FeatureState<BlogRecipe>;
  emailSignup: FeatureState<boolean>;
}

export interface FeatureState<T> extends Loader {
  data: T | null;
}

export type BlogResponse = {
  recipes: BlogRecipe[];
};

export type BlogRecipe = {
  image: string;
  sourceUrl: string;
  title: string;
};
