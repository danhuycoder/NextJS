export interface Product {
  id: number;
  name: string;
  image: string[];
  price: number;
  soldOut?: boolean;
  quantity: number; 
}
