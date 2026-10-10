import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeighlight]',
  standalone: false,
})
export class Heighlight{
  constructor(
    private element : ElementRef ,
    private renderer : Renderer2
  ){}

  @HostListener('mouseover') onMouseEnter(){
    this.renderer.addClass(this.element.nativeElement , 'heightlight-product')
  }

  @HostListener('mouseout') onMouseOut(){
    this.renderer.removeClass(this.element.nativeElement , 'heightlight-product')
  }

}
