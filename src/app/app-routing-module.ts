import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { NotFound } from './shared/components/not-found/not-found';
import { CourseDetails } from './pages/courses-container/course-details/course-details';
import { Courses } from './pages/courses-container/courses/courses';
import { Login } from './shared/components/login/login';
import { Checkout } from './pages/checkout/checkout';
import { CanActivatefn, CanDeactivation } from './shared/guards/Authguard';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Login' },
  {
    // Pathless parent: the auth guard is declared once for all protected pages
    path: '',
    canActivate: [CanActivatefn],
    children: [
      { path: 'Home', component: Home, title: 'Home page' },
      { path: 'About', component: About, title: 'About page' },
      { path: 'Contact', component: Contact, title: 'Contact page', canDeactivate: [CanDeactivation] },
      {
        path: 'Courses',
        children: [
          { path: '', component: Courses, title: 'Courses page' },
          { path: 'course/:id', component: CourseDetails, title: 'Course details' },
          { path: 'checkout', component: Checkout, title: 'Checkout page' },
        ],
      },
    ],
  },
  { path: '**', component: NotFound, title: 'Page not found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
