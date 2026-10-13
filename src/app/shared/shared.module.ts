import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { Footer } from './components/footer/footer';
import { NotFound } from './components/not-found/not-found';
import { Skelton } from './components/skelton/skelton';
import { Toaster } from './components/toaster/toaster';
import { Loading } from './components/loading/loading';

import { SetBackground } from './directives/SetBackground.directive';
import { HoverDirective } from './directives/hover.directive';
import { Heighlight } from './directives/heighlight.directive';
import { DisabledProduct } from './directives/disabledProduct.directive';
import { NgClassDirective } from './directives/customNgClass.directive';
import { NgStyleDirective } from './directives/cutomNgStyle.directive';
import { IfDirective } from './directives/if.directive';

import { PercentagePipe } from './pipes/percentage.pipe';
import { FilterPipe } from './pipes/filter.pipe';

const COMPONENTS = [HeaderComponent, Footer, NotFound, Skelton, Toaster, Loading];

const DIRECTIVES = [
  SetBackground,
  HoverDirective,
  Heighlight,
  DisabledProduct,
  NgClassDirective,
  NgStyleDirective,
  IfDirective,
];

// Pipes are standalone, so they are imported and re-exported rather than declared.
const PIPES = [PercentagePipe, FilterPipe];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ...PIPES],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
})
export class SharedModule {}
