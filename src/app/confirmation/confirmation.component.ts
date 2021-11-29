import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoggerService} from "../services/logger.service";

@Component({
  selector: 'store-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  fullName: string = '';
  total: number = 0;

  constructor(private cartService: CartService, private logger: LoggerService) {}

  ngOnInit(): void {
    const { name, totalPrice } = this.cartService.getConformationDetails();
    this.fullName =  name || ''
    this.total = totalPrice

    this.logger.log(`confirmation for user: ${this.fullName}`)
  }
}

