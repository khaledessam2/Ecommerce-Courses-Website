import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthServices } from "../services/Auth.service";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AuthServices : AuthServices = inject(AuthServices) ;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // the token is only meaningful to our Realtime Database, never send it to the Auth endpoints
    if (!request.url.startsWith(environment.firebaseUrl)) {
      return next.handle(request) ;
    }
    return this.AuthServices.UserSubject.pipe(take(1) , exhaustMap((user)=>{
      if (user?.Token == null) {
        return next.handle(request) ;
      }
      return next.handle(request.clone({ params: request.params.set("auth", user.Token) })) ;
    }))
  }
}
