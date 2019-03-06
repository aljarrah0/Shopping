import { CustomFormsModule } from 'ng2-validation';
import { AngularFireAuth } from 'angularfire2/auth';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DateComponent } from './components/date/date.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'; // connect the project for firebase
import { environment } from 'src/environments/environment.prod';
import { AdminProductFormComponent } from './components/admin/admin-product-form/admin-product-form.component';
import { CategoriesService } from './services/categories/categories.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DataTablesModule } from 'angular-datatables';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    MyOrderComponent,
    NavBarComponent,
    LoginComponent,
    ShoppingCartComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    HomePageComponent,
    DateComponent,
    AdminProductFormComponent,
    SignUpComponent,
    ProductCardComponent,
    ProductsFilterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    CustomFormsModule,
    DataTablesModule
  ],
  providers: [AngularFireAuth, AuthService, AuthGuard, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
