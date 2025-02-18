export interface MealsShippedState extends Loader {
  data: MealsShipped[] | null;
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

export interface Testimonial {
  id: number;
  name: string;
  description: string;
}

export interface TestimonialState extends Loader {
  data: Testimonial[] | null;
}