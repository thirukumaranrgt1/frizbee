import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList:any =[];

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
  }

  navigateToProductDetail(product:any): void {
    this.router.navigate(['/home/productDetail', product.id]);
  }

}
