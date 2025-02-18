export interface MealsShippedState extends Loader {
  data: MealsShipped[];
};

export interface Loader {
    error: null | string;
    loading: boolean;
}

export interface MealsShipped {
  id: number;
  image: string;
  name: string;
  description_primary: string;
  description_secondary: string;
  alt:string
}