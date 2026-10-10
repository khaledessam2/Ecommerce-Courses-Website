export interface CoursesInterface {
  id: number;
  name: string;
  image: string;
  price: number | string;
  rating: number;
  reviews: number;
  category: string;
  stock: boolean;
  description: string;
  longDescription: string;
  is_in_inventory : boolean
}
