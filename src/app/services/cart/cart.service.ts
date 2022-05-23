import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInCart:any =[];
  grandTotal:any = 0;
  private getTotalProducts$: BehaviorSubject<any> = new BehaviorSubject(0); 

  constructor(private productService: ProductService) { }

  addProductToCart(product:any){
    this.productsInCart.push(product);
    this.getTotalProducts$.next(this.getTotalProducts$.value +1);
  }

  getGrandTotal(){
    return this.productsInCart.length >0 ? this.productsInCart.reduce((a:any, b:any)=>  (a) + (b.quantityRequired * b.price),0 ) : 0;
  }
  getTotalProducts(){
    return this.getTotalProducts$.asObservable();
  }

  getCartProducts(){
    return this.productsInCart;
  }

  updateProductInCart(id:any){
    let products = this.productService.getProducts();
    let productIndex = products.findIndex((obj:any) => obj.id == id);
    let cartProductIndex = this.productsInCart.findIndex((obj:any) => obj.id == id);
    
    this.productsInCart[cartProductIndex] = products[productIndex];
    this.productsInCart = JSON.parse(JSON.stringify(this.productsInCart));
   
  }
}


