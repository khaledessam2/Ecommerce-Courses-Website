import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, provideZoneChangeDetection } from "@angular/core";
import { AuthInterceptor } from "./interceptors/Auth.interceptor";
import { LoaderInterceptor } from "./interceptors/loading.interceptor";

@NgModule({
  providers :[
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ]
})

export class CoreModule {}
