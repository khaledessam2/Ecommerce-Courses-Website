import { NgModule, provideZoneChangeDetection} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';

import { HeaderComponent } from './shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Footer } from './shared/components/footer/footer';
import { SetBackground } from './shared/directives/SetBackground.directive';
import { HoverDirective } from './shared/directives/hover.directive';
import { Heighlight } from './shared/directives/heighlight.directive';
import { DisabledProduct } from './shared/directives/disabledProduct.directive';
import { NgClassDirective } from './shared/directives/customNgClass.directive';
import { NgStyleDirective } from './shared/directives/cutomNgStyle.directive';
import { IfDirective } from './shared/directives/if.directive';
import { Home } from './pages/home/home';
import { Banner } from './pages/home/banner/banner';
import { WhyChooseUs } from './pages/home/why-choose-us/why-choose-us';
import { FeaturedCourses } from './pages/home/featured-courses/featured-courses';
import { Faq } from './pages/home/faq/faq';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { NotFound } from './shared/components/not-found/not-found';
import { CoursesContainer } from './pages/courses-container/courses-container';
import { CourseDetails } from './pages/courses-container/course-details/course-details';
import { Courses } from './pages/courses-container/courses/courses';
import { Filter } from './pages/courses-container/courses/filter/filter';
import { AppRoutingModule } from './app-routing-module';
import { Login } from './shared/components/login/login';
import { Checkout } from './pages/checkout/checkout';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi} from '@angular/common/http';
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { AuthInterceptor } from './shared/interceptors/Auth.interceptor';
import { Skelton } from './shared/components/skelton/skelton';
import { LoaderInterceptor } from './shared/interceptors/loading.interceptor';
import { Toaster } from './shared/components/toaster/toaster';
import { Loading } from './shared/components/loading/loading';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    Courses,
    Footer,
    Filter,
    CoursesContainer,
    CourseDetails,
    SetBackground,
    HoverDirective,
    Heighlight,
    DisabledProduct,
    NgClassDirective,
    NgStyleDirective,
    IfDirective,
    Home,
    Banner,
    WhyChooseUs,
    FeaturedCourses,
    Faq,
    About,
    Contact,
    NotFound,
    Login,
    Checkout,
    Skelton,
    Toaster,
    Loading,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, PercentagePipe],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
