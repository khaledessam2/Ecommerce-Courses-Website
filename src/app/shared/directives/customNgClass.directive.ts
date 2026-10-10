import { Directive, ElementRef, Input, Renderer2} from "@angular/core";

@Directive({
  selector : '[NgClassDir]',
  standalone : false
})
export class NgClassDirective{
  constructor(
    private element : ElementRef ,
    private Renderer : Renderer2
  ){}

  @Input() set NgClassDir(value : Object){
    Object.entries(value).forEach(([proberty , condition]) => {
      if(condition) {
        this.Renderer.addClass(this.element.nativeElement , proberty) ;
      }else{
        this.Renderer.removeClass(this.element.nativeElement , proberty) ;
      }
    })
  };
}
// [ngClass] = {className : condition return boolean , className : condition return boolean } ;


