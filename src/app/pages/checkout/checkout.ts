import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesInterface } from '../../shared/models/Courses.interface';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private ActivatedRoute : ActivatedRoute = inject(ActivatedRoute) ;
  private router : Router = inject(Router) ;

  course : CoursesInterface | null = null ;

  ngOnInit(): void {

    // this code if we want to access static data ;

    // this.ActivatedRoute.data.subscribe({
    //   next : (value)=> {
    //     console.log(value) ;
    //   },
    // })

    // this code if we want to access dynamic data ;
    // this.course = this.router.getCurrentNavigation()?.extras.state ;
    this.course = history.state.course ;

    console.log(this.course) ;

  }



}

