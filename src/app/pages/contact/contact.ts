import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDeActivateComponent } from '../../shared/guards/Authquard.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit , IDeActivateComponent {
  contactForm !: FormGroup ;
  isSubmitted : boolean = false ;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      fname : new FormControl('' , Validators.required),
      lname : new FormControl('' , Validators.required),
      country : new FormControl('' , Validators.required),
      subject : new FormControl('' , Validators.required)
    })
  }

  SubmitContactForm(){
    if(this.contactForm.invalid){
      this.contactForm.markAllAsTouched() ;
    } ;
    this.isSubmitted = true ;
    this.contactForm.reset() ;
  }

  canExit() {
    const { fname, lname, country, subject } = this.contactForm.controls;

    if ((fname.value || lname.value || country.value || subject.value) && !this.isSubmitted) {
      return confirm("there is changed not saved , Are you sure you want to Exit") ;
    }

    return true;
  }


}
