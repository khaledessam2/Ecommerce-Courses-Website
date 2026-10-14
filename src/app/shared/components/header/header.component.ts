import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthServices } from "../../services/Auth.service";
import { Subscription } from "rxjs";
import { CartService } from "../../services/cart.service";

@Component({
  selector : "app-header" ,
  standalone : false ,
  templateUrl : './header.component.html' ,
  styleUrls : ['./header.component.css']
})

export class HeaderComponent implements OnInit , OnDestroy{
  private router : Router = inject(Router) ;
  private AuthServices : AuthServices = inject(AuthServices) ;
  protected cartService : CartService = inject(CartService) ;
  private UserSubject !: Subscription ;
  iSLogin : boolean = false ;
  ngOnInit(): void {
    this.UserSubject = this.AuthServices.UserSubject.subscribe({
      next : (user)=> {
        this.iSLogin = user ? true : false ;
      },
    })
  }
  NavigateToCourses(){
    // In two navigation methods the Default pass is Absolute Pass ;
    // this.router.navigate(['Courses']) ;
    this.router.navigateByUrl("/Courses") ;
    // if you want to use relative Route use this method
    // this.router.navigate(['Courses'] , {relativeTo: this.ActivatedRoute}) ;
  }
  LogOut(){
    this.AuthServices.LogOut() ;
  }
  ngOnDestroy(): void {
    this.UserSubject.unsubscribe() ;
  }
}
