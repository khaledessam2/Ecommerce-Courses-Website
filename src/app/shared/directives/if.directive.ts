import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector : '[if]',
  standalone : false
})

export class IfDirective {
  // 1- Get access to the Dom Element Which we want to Add / Remove ;
  // 2- Place From where We Want to Add or Remove Dom Element ;
  constructor(
    private view : TemplateRef<any> , // Dom Element we want to Add / remove
    private template : ViewContainerRef // place which we want Add / remove on it (reference of ng-template)
  ){}

  @Input() set if(condition : boolean){
    if(condition){
      this.template.createEmbeddedView(this.view) ;
    }else{
      this.template.clear() ;
    }
  }
}


// import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

// @Directive({
//   selector: '[if]',
//   standalone: false
// })
// export class IfDirective {
//   private condition = false;
//   private elseView?: TemplateRef<any>;

//   constructor(
//     private view: TemplateRef<any>,
//     private template: ViewContainerRef
//   ) {}

//   @Input() set if(condition: boolean) {
//     this.condition = condition;
//     this.render();
//   }

//   @Input() set ifElse(view: TemplateRef<any>) {
//     this.elseView = view;
//     this.render();
//   }

//   private render() {
//     this.template.clear();                                  // always reset first
//     if (this.condition) {
//       this.template.createEmbeddedView(this.view);          // then-branch
//     } else if (this.elseView) {
//       this.template.createEmbeddedView(this.elseView);      // else-branch
//     }
//   }
// }
