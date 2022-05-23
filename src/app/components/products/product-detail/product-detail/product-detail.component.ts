import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CartService } from '../../../../services/cart/cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product:any;
  productQuantity:any = 0;
  quantityRequired:any = 0;
  disableAdd:boolean= false;
  disableRemove:boolean= true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  disableAddCart:boolean = false;


  constructor(private route: ActivatedRoute,private productService: ProductService,private _snackBar: MatSnackBar, 
      private router:Router,private cartService: CartService) { }

  ngOnInit(): void {
    let id:any = this.route.snapshot.params['id'];
    let products = this.productService.getProducts();
    this.product = products.filter((m:any)=> m.id == id)[0];
    this.disableAddCart = this.product.isAddedToCart;
        this.productService.updateProductStock(this.product.id,this.product.inStock,this.product.quantityRequired);
        this.productService.getProductById(this.product.id).subscribe(prd=>{ 
          this.productQuantity = prd.inStock;
          this.quantityRequired = prd.quantityRequired;
        })
        this.disableRemove = this.quantityRequired <=0 ? true :false;
        this.disableAdd = this.productQuantity <=0 ? true :false;
  }
  ngAfterViewInit(){
 
  }

  updateQuantity(type:string){ console.log("product",this.quantityRequired);
 
    if(type=='add' && !this.disableAdd ){
      this.productService.updateProductStock(this.product.id,this.productQuantity - 1,this.quantityRequired +1);
    }
    if(type=='remove' && !this.disableRemove){
  
      this.productService.updateProductStock(this.product.id,this.productQuantity+ 1,this.quantityRequired-1);
    }
    if(this.product.isAddedToCart){
      this.cartService.updateProductInCart(this.product.id);
    }     
    this.disableRemove = this.quantityRequired <= 0 ? true : false;
    this.disableAdd = this.productQuantity <=0 ? true : false;

  }

  openSnackBar() {
    this._snackBar.open(`${this.product.name} added to cart`, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.disableAddCart = true;
    this.cartService.addProductToCart(
      {id:this.product.id, name:this.product.name, category:this.product.category, inStock:this.product.inStock,price:this.product.price,quantityRequired:this.quantityRequired, isAddedToCart:true, src: this.product.src},);
    this.productService.updateProductCartAddition(this.product.id);
  }

  navigateToCart(){
    this.router.navigate(['/home/cart'])
  }


}
