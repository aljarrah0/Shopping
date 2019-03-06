import { CategoriesService } from './../../../services/categories/categories.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  @Input() category;

  categories$;
  constructor(private categoriesSrv: CategoriesService) {
    this.categories$ = this.categoriesSrv.getCategories();
  }
  ngOnInit() {
  }

}
