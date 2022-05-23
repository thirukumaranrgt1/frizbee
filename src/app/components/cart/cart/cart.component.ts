import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  grandTotal:any =0;
  productsInCart:any =[];
  disableAdd: any = false;
  disableRemove: any = true;
  quantityRequired: any;

  constructor(private cartService: CartService,private router:Router) { }

  ngOnInit(): void { console.log("cart loaded");
    this.grandTotal = this.cartService.getGrandTotal();
    this.productsInCart = this.cartService.getCartProducts();
  }

  navigateToProductDetail(product:any): void {
    this.router.navigate(['/home/productDetail', product.id]);
  }

  navigateToHome(){
    this.router.navigate(['/home/products']);
  }

}
