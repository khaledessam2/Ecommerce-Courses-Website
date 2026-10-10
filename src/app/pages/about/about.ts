import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  @ViewChild('input') input  !: ElementRef ;
  imageUrl : string = '/images/photo_2026-06-26_19-54-44.jpg' ;
  uploadImage(){
    this.input.nativeElement.click() ;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    if ( (file.type === 'image/png' || file.type === 'image/jpeg') &&file.size < 2000000) {
      this.imageUrl = URL.createObjectURL(file) ;
    }
    else if (file.size >= 2000000) {
      console.error('File is too big. Only 2MB is allowed.');
    }
    else {
      console.error('This type is not allowed. Only PNG and JPG are allowed.');
    }
  }

}
