import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct, Quantities} from "../models/product";
import {ProductService} from "../services/product.service";
import { LoggerService} from "../services/logger.service";
import {CartService} from "../services/cart.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = "Product Detail";
  product: IProduct | undefined;
  errorMessage: string = ''
  quantities: number[] = Quantities;
  quantity: number = Quantities[0];

  quantityForm!: FormGroup

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private logger: LoggerService,
              private cartService: CartService, private fb: FormBuilder) {

    logger.log(`${this.route.snapshot.paramMap.get('id')}`)
  }

  onBack():void{
    this.router.navigate(['/products'])
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.getProduct(id)
    }
    this.quantityForm = this.fb.group({
      quantity: []
    })

  }


  /**@
   *
   * @param id
   */
  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  addItem(name: string, price: number, quantity: number, url: string) {
    let item = { name, price, quantity, url };
    this.cartService.addItem(item);
  }

  onChange(quantity: number) {
    this.quantity = quantity;
  }


}
