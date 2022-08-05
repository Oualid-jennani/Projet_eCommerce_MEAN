import {CartItem} from "./cart-item";
import {Category} from "./category";
import {OrderLine} from "./order-line";
import { User } from "./user";

export class Product {
  _id: string;
  name: string;
  images:string;
  price:number;
  compareAtPrice:number;
  description:string;
  status:string;
  category:Category;
  user:User;
  createdAt:Date;
  order_lines:OrderLine[];
}

