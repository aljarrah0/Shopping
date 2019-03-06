import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from 'src/app/model/IShoppingCart';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  async getOrCreateCartID() {
    const cartID = localStorage.getItem('cartID');
    if (cartID) {
      return cartID;
    } else {
      const result = await this.create();
      //  console.log("-----getOrCreateCartID------->", result.key);
      localStorage.setItem('cartID', result.key);
      return result.key;
    }

  }

  getItem(cartID: string, productID: string) {
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productID);
  }

  async addToCart(product) {
    this.updateToCart(product, 1);
  }

  async removeToCart(product) {
    this.updateToCart(product, -1);
  }

  async updateToCart(product, quantityState) {
    // console.log('----------quantityState-------->',quantityState)
    // get CartID for item
    const cartID = await this.getOrCreateCartID();
    // set item into the variable item$
    const item$ = this.getItem(cartID, product.key);
    // update or create the item
    item$.snapshotChanges().take(1).subscribe((items: any) => {
      // If the element was present
      if (items.payload.exists()) {
        item$.update({
          quantity: items.payload.val().quantity + quantityState
        });
      } else {
        item$.update({
          product: {
            title: product.payload.val().title,
            price: product.payload.val().price,
            category: product.payload.val().category,
            imageUrl: product.payload.val().imageUrl
          },
          quantity: 1
        });
      }
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartID = await this.getOrCreateCartID();
    return this.db.object('/shopping-carts/' + cartID).valueChanges()
      .map(cart => new ShoppingCart((cart as any).items));
  }

  async delete(productID: string) {
    const cartID = await this.getOrCreateCartID();
    this.db.object('/shopping-carts/' + cartID + '/items/' + productID)
    .remove()
      .then((result) => console.log('------------then-------->', result))
      .catch((err) => console.error('----------cath----------->', err.message));
  }
}
