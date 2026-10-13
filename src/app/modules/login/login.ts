import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '../../shared/services/Auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private AuthServices : AuthServices = inject(AuthServices) ;
  loginForm !: FormGroup ;
  mode : "Login" | "SignUp" = "Login" ;

  switchMode(){
    this.mode = this.mode === 'Login' ? "SignUp" : "Login" ;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Email : new FormControl('' , [Validators.required , Validators.email]) ,
      password : new FormControl('' , Validators.required) ,
      remember : new FormControl(false) ,
    })
  }

  SubmitLogin(){
    let {Email , password} = this.loginForm.value;
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched() ;
    } else{
      this.mode === 'Login' ? this.AuthServices.Login(Email , password) : this.AuthServices.signUp(Email , password) ;
      this.loginForm.reset() ;
    }
  }

}
