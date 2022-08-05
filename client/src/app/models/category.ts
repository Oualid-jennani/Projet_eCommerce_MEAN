import {Product} from "./product";
import { User } from "./user";

export class Category {
  _id: string;
  name: string;
  products: Product[];
}