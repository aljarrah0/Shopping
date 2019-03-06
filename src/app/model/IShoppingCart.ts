import { IShoppingCartItem } from './IShoppingCartItem';
export class ShoppingCart {

    constructor(private items: IShoppingCartItem[]) {

    }
     get getTotalCart() {
        let counter = 0;
        for (const productID in this.items) {
            counter += this.items[productID].quantity;
        }
        return counter;
    }

    get productsID() {
        if (this.items) {
        return Object.keys(this.items);
        }
    }
}
