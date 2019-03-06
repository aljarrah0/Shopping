import { ProductsService } from './../../../services/products/products.service';
import { CategoriesService } from '../../../services/categories/categories.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})

export class AdminProductFormComponent {
  categories$;
  product = {};
  id;

  constructor(
    private CategoriesSrv: CategoriesService,
    private productsSrv: ProductsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categories$ = this.CategoriesSrv.getCategories();
    if (this.id) {
      this.productsSrv.getById(this.id).take(1).subscribe(pro => {
        if (pro) {// for error title undefind
          this.product = pro;
        }
      });
    }
  }

  save(product) {
    if (this.id) {
      this.productsSrv.update(this.id, product);
    } else {
      this.productsSrv.create(product);
    }
    this.router.navigateByUrl('/admin/products');
  }

}
