import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize, Observable, tap } from "rxjs";
import { Loader } from "../services/loading.service";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
  private LoaderServices : Loader = inject(Loader) ;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (!req.url.includes('courses.json')) {
    //   return next.handle(req);
    // }

    this.LoaderServices.show() ;
    return next.handle(req).pipe(
      finalize( ()=> this.LoaderServices.hide()) 
    )

  }
}
