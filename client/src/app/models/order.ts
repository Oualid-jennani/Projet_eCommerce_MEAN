import {User} from "./user";
import {OrderLine} from "./order-line";

export class Order {
  id: string;
  customerName: string;
  cin: string;
  phoneNumber: string;
  note: string;
  city:string;
  address:string;
  status:string;
  customer: User;
  order_lines: OrderLine[];
  createdAt:Date;
}