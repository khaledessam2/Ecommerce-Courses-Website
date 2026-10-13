import { NgModule } from "@angular/core";
import { CoursesContainer } from "./courses-container";
import { Courses } from "./courses/courses";
import { CourseDetails } from "./course-details/course-details";
import { Filter } from "./courses/filter/filter";
import { SharedModule } from "../../shared/shared.module";
import { CoursesRoutingModule } from "./courses-routing.module";
import { Checkout } from "../../pages/checkout/checkout";

const COMPONENT = [CoursesContainer , Courses , CourseDetails , Filter , Checkout]

@NgModule({
  declarations : [...COMPONENT] ,
  imports : [
    SharedModule,
    CoursesRoutingModule,
  ],
  exports : []
})

export class CoursesModule {}
