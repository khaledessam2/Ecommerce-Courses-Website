import { Directive, ElementRef, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[DisabledProduct]',
  standalone: false,
})
export class DisabledProduct {
  constructor(
    private element : ElementRef ,
    private renderer : Renderer2
  ){}

  @Input() set DisabledProduct(disable: boolean) {
    if (!disable) {
      this.renderer.setStyle(this.element.nativeElement, 'border', '2px solid red', RendererStyleFlags2.Important);
    } else {
      this.renderer.setStyle(this.element.nativeElement, 'border', 'none', RendererStyleFlags2.Important);
    }
  }

}
