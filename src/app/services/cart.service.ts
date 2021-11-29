import {Injectable} from "@angular/core";
import { CartItem, User} from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  totalPrice: number = 0;
  user: User= {};

  constructor() { }

  addItem(item: CartItem) {
    if (this.cart.some(cartitem => cartitem.name === item.name)) {
      let index = this.cart.findIndex(cartitem => cartitem.name === item.name);
      this.cart[index].quantity = this.cart[index].quantity! + item.quantity!;
    } else {
      this.cart.push(item);
      alert('Added product to your cart!');
    }
  }

  addOne(productName: string) {
    let index = this.cart.findIndex(cartitem => cartitem.name === productName);
    this.cart[index].quantity!++
  }

  removeOne(productName: string) {
    let index = this.cart.findIndex(cartitem => cartitem.name === productName);
    if (this.cart[index].quantity === 1) {
      this.cart.splice(index, 1);
      alert('Removed product from your cart!');
    } else {
      this.cart[index].quantity!--
    }
  }

  getItems() {
    return this.cart;
  }

  calculateTotal() {
    let price = this.cart.reduce((sum, current) => {
      return sum + (current.price! * current.quantity!)
    }, 0);
    this.totalPrice = Number(price.toFixed(2));
    return this.totalPrice;
  }


  addUser (user: object) {
    this.user = user;
  }

  getConformationDetails() {
    return {
      name: this.user.fullName,
      totalPrice: this.totalPrice
    }
  }

}
