import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products/').push(product);
  }

  getProducts() {
    return this.db.list('/products/').snapshotChanges();
  }

  getById(id: string) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id: string, updateProduct) {
    return this.db.object('/products/' + id).update(updateProduct)
      .then((result) => console.log('--------> then for update', result))
      .catch((err) => console.error('--------> then for update', err.message));
  }

  delete(id: string) {
    return this.db.object('/products/' + id).remove()
      .then((result) => console.log('--------> then for delete', result))
      .catch((err) => console.error('--------> catch for delete', err.message));
  }
}
