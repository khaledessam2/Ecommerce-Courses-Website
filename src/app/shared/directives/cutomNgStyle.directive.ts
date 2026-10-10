import { Directive, ElementRef, Injectable, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngStyleDir]',
  standalone: false,
})
export class NgStyleDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  @Input() set ngStyleDir(value: Object) {
    Object.entries(value).forEach(([proberty, probertyValue]) => {
      this.renderer.setStyle(this.element.nativeElement, proberty, probertyValue);
    });
  }
}

// [ngStyle]="{ fontWeight: 'bold', color : product.is_in_inventory ? 'green' : 'red' }"
