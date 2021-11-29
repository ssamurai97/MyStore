import { Component, OnDestroy, OnInit} from "@angular/core";
import { IProduct} from "../models/product";
import {ProductService} from "../services/product.service";
import {Subscription} from "rxjs";
import {CartItem} from "../models/CartItem";
import {CartService} from "../services/cart.service";

@Component({
    selector: "store-product-list",
    templateUrl: './product-list.component.html',
    providers:[ProductService]
})

export class ProductListComponent implements OnDestroy, OnInit{

    sub!: Subscription;
    errorMessage: string = '--'

    constructor( private productService: ProductService, private cartService: CartService) {
    }

    products: IProduct[] = [];


    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    ngOnInit() {
        this.sub= this.productService.getProducts().subscribe({
            next: products => {this.products = products;
            },
            error: err => this.errorMessage = err
        })

    }


    addedProduct(event: CartItem){
        this.cartService.addItem(event);
    }


}

