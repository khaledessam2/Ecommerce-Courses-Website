import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CoursesInterface } from '../../../shared/models/Courses.interface';
import { CoursesService } from '../../../shared/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '../../../shared/services/loading.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-Courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  private CourseService: CoursesService = inject(CoursesService);
  private Router: Router = inject(Router);
  private ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private cdr : ChangeDetectorRef = inject(ChangeDetectorRef) ;
  protected LoaderService : Loader = inject(Loader) ;
  protected cartService : CartService = inject(CartService) ;

  private courses: CoursesInterface[] = [];

  // Search text from the url (?search=...)
  QuerySearch: string | undefined = '';

  // Filter Functionality
  FilterPrice: string = 'all';

  ngOnInit(): void {
    this.CourseService.GetCoureses().subscribe({
      next: (value) => {
        this.courses = value ;
        this.cdr.detectChanges() ;
      }
    });

    this.ActivatedRoute.queryParamMap.subscribe({
      next: (params) => {
        if(!params) return ;
        this.QuerySearch = params.get('search')?.trim().toLowerCase();
        this.cdr.detectChanges() ;
      }
    });
  }

  // Filter based On name
  get searchedCourses(): CoursesInterface[] {
    const text = this.QuerySearch;
    return text ? this.courses.filter((p) => p.name.toLowerCase().includes(text)) : this.courses;
  }

  // Counters always reflect the search result, not the price filter
  get AllCount(): number {
    return this.searchedCourses.length;
  }

  get FreeCount(): number {
    return this.searchedCourses.filter((p) => p.price === 0).length;
  }

  get PremiumCount(): number {
    return this.AllCount - this.FreeCount;
  }

  // filter based On price
  get filterCourses(): CoursesInterface[] {
    const searched = this.searchedCourses;
    switch (this.FilterPrice) {
      case 'free': return searched.filter((p) => p.price === 0);
      case 'premium': return searched.filter((p) => p.price !== 0);
      default: return searched;
    }
  }

  GoToDetails(id: number) {
    // this.Router.navigateByUrl(`Courses/course/${id}`) ; //Absolute
    // this.Router.navigate(['course' , id] , {relativeTo : this.ActivatedRoute }) ; // relative
    this.Router.navigate(['Courses', 'course', id]); // Absolute
  }

  GoToCheckout(course: CoursesInterface) {
    this.Router.navigate(['Courses', 'checkout', course.id]);
  }
}
