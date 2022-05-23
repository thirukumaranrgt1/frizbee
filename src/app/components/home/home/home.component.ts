import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currenturl:any;
  totalProductsInCart:any;
  hidden = false;

  constructor(private router: Router, private route:ActivatedRoute,private cartService: CartService) { }

  ngOnInit(): void {
  
    this.currenturl = this.router.url;
    this.cartService.getTotalProducts().subscribe(res=>{ 
      this.totalProductsInCart = res;
    });
  }



  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
    if(this.hidden){ 
      this.router.navigate(['/home/cart']);
    }
    else{
      this.router.navigate(['/home/products']);
    }
  }

  signOut(){
    localStorage.setItem('user', 'null');
    this.router.navigate(['/login']);
    window.location.reload();
  }

}
