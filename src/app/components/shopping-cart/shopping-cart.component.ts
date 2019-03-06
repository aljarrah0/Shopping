import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  constructor(private shoppingCartSrv: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartSrv.getCart();
    // this.cart$.subscribe(cart => {
    //   console.log(cart);
    // })
  }

  deleteProduct(id: string) {
    // console.log(id)
    this.shoppingCartSrv.delete(id);
  }

}
