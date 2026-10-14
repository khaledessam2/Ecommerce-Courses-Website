import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  protected cartService : CartService = inject(CartService) ;
  private router : Router = inject(Router) ;

  GoToCheckout(id : number) {
    this.router.navigate(['Courses', 'checkout', id]) ;
  }
}
