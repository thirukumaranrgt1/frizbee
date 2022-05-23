import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart/cart.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products/products.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path:"",redirectTo:"/login",pathMatch:'full' },
  {path:"login", component:LoginComponent,pathMatch:'prefix'  },
  {path:"home", component:HomeComponent,pathMatch:'prefix',canActivate: [AuthGuard],
children:[
  {path:"products", component:ProductsComponent,pathMatch:'prefix' },
  {path:"cart", component:CartComponent,pathMatch:'prefix' },
  {path:"productDetail/:id", component:ProductDetailComponent,pathMatch:'prefix'  }
] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
