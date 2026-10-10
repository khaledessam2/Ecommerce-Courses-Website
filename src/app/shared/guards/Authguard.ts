import { inject } from "@angular/core";
import { AuthServices } from "../services/Auth.service";
import { Router } from "@angular/router";
import { IDeActivateComponent } from "./Authquard.service";
import { map, take } from "rxjs/operators";


export const CanActivatefn = () => {
  const authServices : AuthServices = inject(AuthServices) ;
  const router : Router = inject(Router) ;
  return authServices.UserSubject.pipe(take(1), map(user => {
          if(user){
            return true ;
          }else{
            router.navigate(["login"]) ;
            return false
          }
      } )
    );
}

export const CanActivateChildFn = ()=>{
  return CanActivatefn() ;
}


export const CanDeactivation = (component : IDeActivateComponent)=>{
  return component.canExit() ;
}
