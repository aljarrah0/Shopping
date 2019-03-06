import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/model/IShoppingCart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[];
  filteredProducts;
  cart$: Observable<ShoppingCart>;
  category;
  SubScriper: Subscription;
  constructor(private productsSrv: ProductsService, private route: ActivatedRoute, private shoppingCartSrv: ShoppingCartService) {
    this.SubScriper = this.productsSrv.getProducts()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(product => product.payload.val().category === this.category) : this.products;
      });
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartSrv.getCart();
  }
  ngOnDestroy() {
    this.SubScriper.unsubscribe();
  }
}
