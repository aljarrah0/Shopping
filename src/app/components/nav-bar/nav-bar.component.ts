import { ShoppingCartService } from './../../services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/model/IShoppingCart';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: firebase.User;
  cart$: Observable<ShoppingCart>;
  constructor(private authSrv: AuthService, private router: Router, private shoppingCartSrv: ShoppingCartService) {
    authSrv.AppUser$.subscribe(user => this.user = user);
  }

  async  ngOnInit() {
    this.cart$ = await this.shoppingCartSrv.getCart();

  }
  signOut() {
    this.authSrv.signOut();
    this.router.navigateByUrl('/');
  }
}
