import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesInterface } from '../../shared/models/Courses.interface';
import { CoursesService } from '../../shared/services/courses.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private ActivatedRoute : ActivatedRoute = inject(ActivatedRoute) ;
  private router : Router = inject(Router) ;
  private coursesService : CoursesService = inject(CoursesService) ;
  private toast : ToastService = inject(ToastService) ;

  // tax rate applied on the course price
  readonly TAX_RATE = 0.14 ;

  course : CoursesInterface | null = null ;

  checkoutForm : FormGroup = new FormGroup({
    fullName : new FormControl('' , Validators.required) ,
    cardNumber : new FormControl('' , [Validators.required , Validators.pattern(/^(\d{4}[- ]?){3}\d{4}$/)]) ,
    month : new FormControl('' , Validators.required) ,
    year : new FormControl('' , Validators.required) ,
    cvv : new FormControl('' , [Validators.required , Validators.pattern(/^\d{3,4}$/)]) ,
  }) ;

  ngOnInit(): void {
    const id = Number(this.ActivatedRoute.snapshot.paramMap.get('id')) ;
    this.coursesService.GetCoureses().subscribe({
      next : (courses) => {
        const course = courses.find((c) => c.id === id) ;
        if (!course) {
          this.toast.error('Course not found') ;
          this.router.navigateByUrl('/Courses') ;
          return ;
        }
        this.course = course ;
      },
    }) ;
  }

  get price() : number {
    return Number(this.course?.price) || 0 ;
  }

  get tax() : number {
    return this.price * this.TAX_RATE ;
  }

  get total() : number {
    return this.price + this.tax ;
  }

  BuyNow() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched() ;
      return ;
    }
    // there is no payment backend yet, so the purchase is only confirmed to the user
    this.toast.success(`You have successfully purchased ${this.course?.name}`) ;
    this.router.navigateByUrl('/Courses') ;
  }
}
