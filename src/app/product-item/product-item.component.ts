import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct, Quantities} from "../models/product";
import { CartService} from "../services/cart.service";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'store-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: IProduct = {description: "", id: 0, name: "", price: 0, url: ""};
  @Output() addedProduct = new EventEmitter()

    pageTitle: string ="Product Item"
    imageWidth: number = 80;
    imageMargin: number = 2;
    showImage: boolean = true;
    quantities: number[] = Quantities
    quantity: number = Quantities[0];
    quantityForm!: FormGroup
    constructor(private cartService: CartService, private fb: FormBuilder) { }
  ngOnInit(): void {
      this.quantityForm = this.fb.group({
        quantity: ''
      })
      this.quantityForm.setValue({quantity: this.quantities[0]})
  }
    addItem(name: string, price: number, quantity: number, url: string) {
        let item = { name, price, quantity, url };
        this.addedProduct.emit(item);
    }

    onChange(quantity: number) {
       this.quantityForm.setValue({quantity: quantity});
    }

    toggleImage(): void {
        this.showImage = !this.showImage
    }


}
