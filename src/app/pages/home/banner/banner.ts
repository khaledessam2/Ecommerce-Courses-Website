import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  private Route: Router = inject(Router);

  SearchForCourse(value: string) {
    this.Route.navigate(['Courses'], { queryParams: { search: value } });
  }

}


