import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { NotFound } from './shared/components/not-found/not-found';
import { CanActivatefn, CanDeactivation } from './shared/guards/Authguard';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: '',
    canActivate: [CanActivatefn],
    children: [
      { path: 'Home', component: Home, title: 'Home page' },
      { path: 'About', component: About, title: 'About page' },
      { path: 'Contact', component: Contact, title: 'Contact page', canDeactivate: [CanDeactivation] },
      { path: 'Courses', title: 'Courses page',
        loadChildren: () => import("./modules/courses-container/courses.module").then((m)=> m.CoursesModule) },
    ],
  },
  { path: 'login', title: 'Login page',
    loadChildren: () => import("./modules/login/Auth.module").then((m)=> m.AuthModule) },
  { path: '**', component: NotFound, title: 'Page not found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {preloadingStrategy : PreloadAllModules})], // NoPreloading => this is default value
  exports: [RouterModule]
})
export class AppRoutingModule { }
