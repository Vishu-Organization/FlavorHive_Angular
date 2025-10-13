// Angular equivalent of your React types

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
