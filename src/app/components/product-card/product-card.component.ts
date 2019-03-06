import { ShoppingCartService } from './../../services/shopping-cart/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product;
  @Input() shoppingCart;
  constructor(private shoppingCartSrv: ShoppingCartService) { }

  ngOnInit() {

  }

  addToCart() {
    this.shoppingCartSrv.addToCart(this.product);
  }

  removeToCart() {
    this.shoppingCartSrv.removeToCart(this.product);
  }

  getQuantity() {


    if (!this.shoppingCart) { return 0; }
    if (this.shoppingCart) {
      // console.log("----getQuantity------->", this.shoppingCart);
      const item = this.shoppingCart.items[this.product.key];
      // console.log("=====item=====>", item);
      return item ? item.quantity : 0;
    }
  }

}
