import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CoursesInterface } from '../../../shared/models/Courses.interface';
import { CoursesService } from '../../../shared/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '../../../shared/services/loading.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  private CourseServices : CoursesService = inject(CoursesService) ;
  private ActivatedRoute : ActivatedRoute = inject(ActivatedRoute) ;
  private cdr : ChangeDetectorRef = inject(ChangeDetectorRef)
  protected LoaderService : Loader = inject(Loader) ;
  protected cartService : CartService = inject(CartService) ;

  private courses : CoursesInterface[] = [] ;

  courseId : number = 1 ;
  quantity : number = 1 ;

  ngOnInit(): void {
    this.CourseServices.GetCoureses().subscribe({
      next : (value) =>{
        this.courses = value
        this.cdr.detectChanges() ;
      }
    });

    // the router cleans this subscription up when the route is destroyed
    this.ActivatedRoute.paramMap.subscribe({
      next : (params) => {
        if(!params) return ;
        this.courseId = Number(params.get('id')) ;
        this.cdr.detectChanges() ;
      }
    });
  }

  get SelectedCourse() : CoursesInterface | undefined {
    return this.courses.find((course) => course.id === this.courseId) ;
  }

  get suggestCourses() : CoursesInterface[] {
    return this.courses.filter((course) => course.id !== this.courseId) ;
  }
}
