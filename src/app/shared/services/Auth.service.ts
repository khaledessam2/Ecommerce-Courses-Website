import { inject, Injectable } from "@angular/core";
import { User } from "../models/Users";
import { HttpClient } from "@angular/common/http";
import { ToastService } from "./toast.service";
import { Router } from "@angular/router";
import { AuthResponse } from "../models/AuthResponse";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthServices {
  private APIKEY: string = "AIzaSyAe3aMeSobBIeiflunHKJ_j8kKvOLDe8U4";
  private LoginURL: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKEY}`;
  private SignUpURL: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKEY}`;
  private HTTp: HttpClient = inject(HttpClient);
  private toastServices: ToastService = inject(ToastService);
  private Router: Router = inject(Router);
  UserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private TokenExpireTimer : any ;

  private HandleFunctionality(email: string, password: string, mode: "Login" | "SignUp"): void {
    const data = { email, password, returnSecureToken: true };
    this.HTTp.post<AuthResponse>(mode === "Login" ? this.LoginURL : this.SignUpURL, data).pipe(catchError((err) => {
      let ErrorMessage = "An Unknown Error Occurred";
      switch (err?.error?.error?.message) {
        case "EMAIL_EXISTS":
          ErrorMessage = "The email address is already in use by another account.";
          break;
        case "OPERATION_NOT_ALLOWED":
          ErrorMessage = "Password sign-in is disabled for this project.";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          ErrorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
          break;
        case "EMAIL_NOT_FOUND":
          ErrorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
          break;
        case "INVALID_LOGIN_CREDENTIALS":
        case "INVALID_PASSWORD":
          ErrorMessage = "The password is invalid or the user does not have a password.";
          break;
        case "USER_DISABLED":
          ErrorMessage = "The user account has been disabled by an administrator.";
          break;
      }
      return throwError(() => ErrorMessage);
    }), tap((response) => {
      const expireDate = new Date().getTime() + Number(response.expiresIn) * 1000;
      const user = new User(response.email, response.localId, response.idToken, new Date(expireDate));
      this.UserSubject.next(user);
      this.autoLogOut(Number(response.expiresIn) * 1000) ;
      localStorage.setItem("user", JSON.stringify(user));
    })).subscribe({
      next: (value) => {
        if (value) {
          this.Router.navigateByUrl("/Home");
          this.toastServices.success(`${mode} Successfully`);
        } else {
          this.toastServices.error(`Faild ${mode} `);
        }
      },
      error: (err) => {
        this.toastServices.error(err, 3000)
      },
    })
  }

  signUp(email: string, password: string): void {
    this.HandleFunctionality(email, password, "SignUp");
  }

  Login(email: string, password: string): void {
    this.HandleFunctionality(email, password, "Login");
  }

  autoLogin() {
    const GetUserFromLocalStorage  = JSON.parse(localStorage.getItem("user")!)
    if (!GetUserFromLocalStorage) return;
    const user = new User(GetUserFromLocalStorage.email, GetUserFromLocalStorage.id, GetUserFromLocalStorage._token, new Date(GetUserFromLocalStorage._expireIn));
    if(user.Token){
      this.UserSubject.next(user) ;
      this.autoLogOut(new Date(GetUserFromLocalStorage._expireIn).getTime() - new Date().getTime())
    }
  }

  LogOut(): void {
    this.UserSubject.next(null);
    this.Router.navigate(["login"]);
    localStorage.removeItem("user") ;
    if(this.TokenExpireTimer){
      clearTimeout(this.TokenExpireTimer) ;
    }
    this.TokenExpireTimer = null ;
  }

  autoLogOut(expirein : number){
    clearTimeout(this.TokenExpireTimer);
    this.TokenExpireTimer = setTimeout(()=>{
      this.LogOut() ;
    } , expirein)
  }

}
