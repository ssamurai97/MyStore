import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'store-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  fullname: string = '';
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const { name, totalPrice } = this.cartService.getConformationDetails();
    this.fullname =  name || ''
    this.total = totalPrice
  }
}

