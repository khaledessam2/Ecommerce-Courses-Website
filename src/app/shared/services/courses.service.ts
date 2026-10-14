import { inject, Injectable } from "@angular/core";
import { CoursesInterface } from "../models/Courses.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, of } from "rxjs";
import { ToastService } from "./toast.service";

@Injectable({
    providedIn :'root'
})

export class CoursesService{
    private http : HttpClient = inject(HttpClient) ;
    private toast = inject(ToastService);

    GetCoureses(): Observable<CoursesInterface[]> {
      return this.http.get<Record<string, CoursesInterface>>(`${environment.firebaseUrl}courses.json`).pipe(
        map((value) => {
          return Object.values(value ?? {});
        }),
        catchError((error) => {
          this.toast.error(`Failed : ${error?.error?.error ?? error?.message ?? "Unknown error"}`);
          return of([]);
        })
      );
    }
}
