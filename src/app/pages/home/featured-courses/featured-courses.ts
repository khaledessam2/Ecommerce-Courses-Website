import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesInterface } from '../../../shared/models/Courses.interface';
import { CoursesService } from '../../../shared/services/courses.service';
import { Loader } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-featured-courses',
  standalone: false,
  templateUrl: './featured-courses.html',
  styleUrl: './featured-courses.css',
})
export class FeaturedCourses implements OnInit {
  private CoursesService: CoursesService = inject(CoursesService);
  private Router: Router = inject(Router);
  private cdr : ChangeDetectorRef = inject(ChangeDetectorRef);
  protected courses : CoursesInterface[] = [] ;
  protected LoaderService : Loader = inject(Loader) ;

  ngOnInit(): void {
    this.LoaderService.show();
    this.CoursesService.GetCoureses().subscribe({
      next : (value) => {
        this.courses = value.slice(0, 4) ;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  stars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  GoToDetails(id: number) {
    this.Router.navigate(['Courses', 'course', id]);
  }

  GoToAllCourses() {
    this.Router.navigate(['Courses']);
  }
}
