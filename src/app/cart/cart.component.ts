import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CartItem} from "../models/CartItem";
@Component({
  selector: 'store-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems: CartItem[] = [];
  totalPrice: number = 0;
  fullName: string = '';
  address: string = '';
  creditcard!: number;

  userForm!: FormGroup;
  constructor(private cartService: CartService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cartitems = this.cartService.getItems();
    this.totalPrice = this.cartService.calculateTotal();

    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['',[Validators.required, Validators.minLength(6)]],
      creditcard: ['',[Validators.required, Validators.minLength(16)]]

    })
  }

  addOne(productName: string) {
    this.cartService.addOne(productName);
    this.totalPrice = this.cartService.calculateTotal();
  }


  removeOne(productName: string) {
    this.cartService.removeOne(productName);
    this.totalPrice = this.cartService.calculateTotal();
  }

  submitForm() {
    let user = {
      fullName: this.fullName,
      address: this.address,
      creditcard: this.creditcard
    }
    this.cartService.addUser(user);
    this.router.navigate(['/confirmation'])
  }

  testData(){
    this.userForm.patchValue({
      fullName: 'Deng Mach',
      address: '123  23th ave N',
      creditcard: '42424243434343434343'
    })
  }
}
