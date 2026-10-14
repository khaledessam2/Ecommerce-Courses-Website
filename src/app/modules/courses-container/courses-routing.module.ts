import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Courses } from "./courses/courses";
import { CourseDetails } from "./course-details/course-details";
import { Checkout } from "../../pages/checkout/checkout";
import { Cart } from "../../pages/cart/cart";

const routes : Routes = [
  { path: '', component: Courses, title: 'Courses page' },
  { path: 'course/:id', component: CourseDetails, title: 'Course details' },
  { path: 'cart', component: Cart, title: 'Cart page' },
  { path: 'checkout/:id', component: Checkout, title: 'Checkout page' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoursesRoutingModule {}
