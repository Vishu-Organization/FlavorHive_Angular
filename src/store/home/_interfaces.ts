import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export type Loader = {
  error: null | string;
  loading: boolean;
};
export type MealsShipped = {
  id: number;
  image: string;
  name: string;
  description_primary: string;
  description_secondary: string;
  alt: string;
};
export type MealsShippedState = EntityState<MealsShipped> & Loader;

export const mealsShippedAdapter: EntityAdapter<MealsShipped> =
  createEntityAdapter<MealsShipped>();
export type Testimonial = {
  id: number;
  name: string;
  description: string;
};
export type TestimonialState = EntityState<Testimonial> & Loader; 

export const testimonialsAdapter: EntityAdapter<Testimonial> =
  createEntityAdapter<Testimonial>();

export type HomeRecipesState = Loader & {
  data: null | HomeMenu;
};

export type HomeMenu = {
  mediterranean: HomeMenuItem;
  breakFast: HomeMenuItem;
  vegetarian: HomeMenuItem;
  french: HomeMenuItem;
  indian: HomeMenuItem;
  starter: HomeMenuItem;
  snack: HomeMenuItem;
  mexican: HomeMenuItem;
  pancake: HomeMenuItem;
  salad: HomeMenuItem;
};

type HomeMenuItem = {
  recipe: Recipe | null;
  selector: HomeMenuSelector;
};

export type Recipe = {
  label: string;
  image: string;
  images: RecipeImages;
  source: string;
  url: string;
  healthLabels: string[];
  ingredientLines: string[];
  calories: number;
  totalTime: number;
  dietLabels: string[];
  yield: number;
};

export type RecipeImages = {
  LARGE?: ImageContent;
  REGULAR: ImageContent;
  SMALL: ImageContent;
  THUMBNAIL: ImageContent;
};

export type ImageContent = {
  height: number;
  url: string;
  width: number;
};

export type HomeMenuSelector = 'cuisine' | 'meal' | 'health' | 'dish';

export const HomeMenuSelector = {
  cuisine: 'cuisine' as HomeMenuSelector,
  meal: 'meal' as HomeMenuSelector,
  health: 'health' as HomeMenuSelector,
  dish: 'dish' as HomeMenuSelector,
};

export type SelectorMap = {
  fields: string[];
  mealType?: string[];
  cuisineType?: string[];
  health?: string[];
  dishType?: string[];
  diet?: string[];
};

export type RecipeHit = {
  recipe: Recipe;
  _links: SelfNextLinks;
};

type SelfNextLinks = {
  self: Link;
  next: Link;
};

type Link = {
  href: string;
  title: string;
};

export type RecipeResponse = {
  from: number;
  to: number;
  count: number;
  _links: SelfNextLinks;
  hits: RecipeHit[];
};
