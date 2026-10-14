import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDeActivateComponent } from '../../shared/guards/Authquard.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit , IDeActivateComponent {
  private toast : ToastService = inject(ToastService) ;
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
      return ;
    }
    // no backend endpoint for contact messages yet, so this only confirms to the user
    this.isSubmitted = true ;
    this.contactForm.reset() ;
    this.toast.success("Your message has been sent. We'll get back to you shortly.") ;
  }

  canExit() {
    const { fname, lname, country, subject } = this.contactForm.controls;

    if ((fname.value || lname.value || country.value || subject.value) && !this.isSubmitted) {
      return confirm("there is changed not saved , Are you sure you want to Exit") ;
    }

    return true;
  }


}
