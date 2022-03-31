import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../state/app.state';

import * as ProductActions from './state/products.actions';
import { Product } from './state/products.interface';

import {
  getError,
  getProducts,
  getShowProductCode,
  getShowProductCodeTrigger,
} from './state/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  errorMessage$!: Observable<string>;
  showProduct$!: Observable<boolean>;
  showProductTrigger$!: Observable<string>;
  products$!: Observable<Product[]>;

  constructor(private store: Store<State>) {}


  ngOnInit(): void {
    // here we use selector
    this.showProduct$ = this.store.select(getShowProductCode);
    this.showProductTrigger$ = this.store.select(getShowProductCodeTrigger);

    // load products from server with effect
    // our effect will call to service
    this.store.dispatch(ProductActions.loadProducts());

    // here we select our data from store with selector.
    // we use 'getProducts' selector.
    // instead using 'async' pipe we can also use unsubscribe
    this.products$ = this.store.select(getProducts);



    this.errorMessage$ = this.store.select(getError);

  }

  checkChanged() {
    // here we dispatch to this action 'toggleProductCode'
    this.store.dispatch(ProductActions.toggleProductCode());

    // here we dispatch to aur action and pass some data.
    this.store.dispatch(
      ProductActions.setProductCode({ trigger: 'new string' })
    );
  }
}
