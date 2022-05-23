import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:any = [
    {id:1, name:"Brown Belt", category:"Accessories", inStock:10,price:150,quantityRequired:0, isAddedToCart:false, src: "assets/belt1.jpg"},
    {id:2,name:"Black Belt",category:"Accessories",inStock:10,price:200,quantityRequired:0, isAddedToCart:false, src: "assets/belt2.jpg"},
    {id:3,name:"Men's Belt - Tan",category:"Accessories",inStock:10,price:300,quantityRequired:0, isAddedToCart:false, src: "assets/belt3.jpg"},
    {id:4,name:"Casual Wear Combo",category:"Fashion",inStock:10,price:1000,quantityRequired:0, isAddedToCart:false, src: "assets/casualwearcombo.jpg"},
    {id:5,name:"Causal shoes",category:"Accessories",inStock:10,price:700,quantityRequired:0, isAddedToCart:false, src: "assets/causalshoes.jpg"},
    {id:6,name:"Men's Causal wear",category:"Fashion",inStock:10,price:3000,quantityRequired:0, isAddedToCart:false, src: "assets/causalwear.jpg"},
    {id:7,name:"Formal Shirt",category:"Fashion",inStock:10,price:600,quantityRequired:0, isAddedToCart:false, src: "assets/formalshirt1.jpg"},
    {id:8,name:"Hoodie",category:"Fashion",inStock:10,price:1200,quantityRequired:0, isAddedToCart:false, src: "assets/hoodie.jpg"},
    {id:9,name:"Jean",category:"Fashion",inStock:10,price:900,quantityRequired:0, isAddedToCart:false, src: "assets/jean.jpg"},
    {id:10,name:"Men's Wear combo",category:"Fashion",inStock:10,price:2500,quantityRequired:0, isAddedToCart:false, src: "assets/menswearcombo.jpg"},
    {id:11,name:"Formal Shirt",category:"Fashion",inStock:10,price:750,quantityRequired:0, isAddedToCart:false, src: "assets/shirt1.jpg"},
    {id:12,name:"SmartWatch",category:"Accessories",inStock:10,price:6000,quantityRequired:0, isAddedToCart:false, src: "assets/smartwatch1.jpg"}
  ];

  private getProductById$: BehaviorSubject<any> = new BehaviorSubject(null); 

  constructor() { }

  getProducts(){
    
    return this.products;
  }

  getProductById(id:any){
    return this.getProductById$.asObservable();
  }

  updateProductStock(id:any, stock:any, quantityRequired:any){ 
    let product = this.products.filter((m:any)=> m.id == id)[0];
    product.inStock = stock;
    product.quantityRequired = quantityRequired;
    this.getProductById$.next(product);
  }

  updateProductCartAddition(id:any){
    let product = this.products.filter((m:any)=> m.id == id)[0];
    product.isAddedToCart = true;
  }
}
