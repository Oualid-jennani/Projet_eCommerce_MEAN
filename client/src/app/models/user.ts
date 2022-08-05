import {Order} from "./order";


export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  roles: string[];

  orders: Order[];
}

