import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../services/products/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[];
  filterProducts;
  SubScriper: Subscription;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(private productsSrv: ProductsService) {
    this.SubScriper = this.productsSrv.getProducts()
      .subscribe(products => {
        this.filterProducts = this.products = products;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }



  delete(id) {
    if (confirm('You Are Delete The Product ?')) {
      this.productsSrv.delete(id);
    }
  }

  filter(queryString: string) {
    console.log(queryString);
    if (queryString) {
      this.filterProducts = this.products
      .filter(products => products.payload.val().title.toLowerCase().includes(queryString.toLowerCase()));

    } else {
      this.filterProducts = this.products;
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }

  ngOnDestroy(): void {
    this.SubScriper.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
