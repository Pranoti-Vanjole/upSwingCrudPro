import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private products: Product[] = [];
  private productSubject = new BehaviorSubject<Product[]>(this.products);
  products1: Product[] = [];
  constructor() {}

  getProducts() {
    return this.productSubject.asObservable();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(product => product.proId === updatedProduct.proId);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productSubject.next(this.products);
    }
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex(product => product.proId === id);
    if (index !== -1) {
      this.products = [
        ...this.products.slice(0, index),
        ...this.products.slice(index + 1)
      ];
      this.productSubject.next([...this.products]);
    }
  }
  
}