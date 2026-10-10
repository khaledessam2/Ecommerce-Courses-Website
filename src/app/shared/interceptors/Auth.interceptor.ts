import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take, tap } from "rxjs";
import { AuthServices } from "../services/Auth.service";
import { inject } from "@angular/core";

export class AuthInterceptor implements HttpInterceptor {
  private AuthServices : AuthServices = inject(AuthServices) ;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.AuthServices.UserSubject.pipe(take(1) , exhaustMap((user)=>{
      let params = new HttpParams().append('Content-Type', 'application/json');
      if (user?.Token != null) {
        params = params.append("auth", user.Token);
      }
      const ModifiedRequest = request.clone({ params });
      return next.handle(ModifiedRequest) ;
    }))
  }
}
