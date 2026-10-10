import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector:'[HoverDirective]' ,
  standalone:false
})
export class HoverDirective{
  constructor(
    private element : ElementRef ,
    private renderer : Renderer2
  ){}

  @HostBinding('style.border') border : string = '1px solid red'
  @HostBinding('style.backgroundColor') backgroundColor : string = 'transparent'
  @HostBinding('style.color') color : string = 'red'

  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.setStyle(this.element.nativeElement , 'transform' , 'scale(1.01)');
    this.backgroundColor = 'red';
    this.color = 'white';
    this.renderer.setStyle(this.element.nativeElement , 'transition-duration' , '0.4s');
  }

  @HostListener('mouseout') onMouseOut(){
    this.renderer.setStyle(this.element.nativeElement , 'transform' , 'scale(1)');
    this.backgroundColor= 'transparent';
    this.color ='red';
    this.renderer.setStyle(this.element.nativeElement , 'transition-duration' , '0.4s');
  }

}
