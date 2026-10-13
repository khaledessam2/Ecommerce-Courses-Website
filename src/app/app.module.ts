import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';

import { Home } from './pages/home/home';
import { Banner } from './pages/home/banner/banner';
import { WhyChooseUs } from './pages/home/why-choose-us/why-choose-us';
import { FeaturedCourses } from './pages/home/featured-courses/featured-courses';
import { Faq } from './pages/home/faq/faq';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    App,
    Home,
    Banner,
    WhyChooseUs,
    FeaturedCourses,
    Faq,
    About,
    Contact,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
