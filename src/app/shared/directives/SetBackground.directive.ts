import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector : "[SetBackground]",
  standalone : false
})

export class SetBackground implements OnInit{
  // @Input('') textColor : string = 'red' ;
  // @Input('SetBackground') FontWeight : string = 'bold' ;

  @Input('SetBackground') SetTextAndWeight : {textColor : string , FontWeight? : string } = {textColor :'red' , FontWeight : 'bold' } ;
  constructor(
    private element : ElementRef ,
    private renderer : Renderer2
  ){}

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement , 'color' , this.SetTextAndWeight.textColor) ;
    this.renderer.setStyle(this.element.nativeElement , 'fontWeight' , this.SetTextAndWeight.FontWeight)
  }
}
