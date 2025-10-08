import { Loader } from '../home/_interfaces';

export type SharedState = {
  blog: FeatureState<BlogRecipe>;
  emailSignup: FeatureState<boolean>;
}

export type FeatureState<T> = {
  data: T | null;
} & Loader

export type BlogResponse = {
  recipes: BlogRecipe[];
};

export type BlogRecipe = {
  image: string;
  sourceUrl: string;
  title: string;
};
