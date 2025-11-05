import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loader } from '../home/_interfaces';

export const OnTheMenuFilterOption = {
  cuisineType: 'cuisine',
  dietType: 'diet',
  dishType: 'dish',
  health: 'health',
  mealType: 'meal',
  ingr: 'ingredients',
} as const;

// This creates a union type: "cuisine" | "diet" | "dish" | "health" | "meal" | "ingredients"
export type OnTheMenuFilterOptionType =
  (typeof OnTheMenuFilterOption)[keyof typeof OnTheMenuFilterOption];

export type Filters = Record<string, string[]>;

export type Filter = {
  id: number;
  value: string;
  label?: string | null;
  description?: string | null;
};

export type MenuHeaderFilters = Record<
  OnTheMenuFilterOptionType,
  Filter[] | null
>;

export const initialFilters = {
  cuisine: [],
  diet: [],
  dish: [],
  health: [],
  meal: [],
  ingredients: [],
};

/**
 * NgRx Entity setup — allows normalized access to all filters if needed
 */

export type OnTheMenuFilterEntityState = EntityState<Filter> & Loader;
export const filterAdapter: EntityAdapter<Filter> =
  createEntityAdapter<Filter>();

export type OnTheMenuFilterState = {
  data: MenuHeaderFilters | null;
} & Loader;

export const initialOnTheMenuFilterState: OnTheMenuFilterState = {
  data: null,
  loading: false,
  error: null,
};
