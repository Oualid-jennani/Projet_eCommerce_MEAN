import {Product} from "./product";
import {Order} from "./order";

export class OrderLine {
  id: string;
  product:Product;
  quantity:number;
  order:Order;
}
