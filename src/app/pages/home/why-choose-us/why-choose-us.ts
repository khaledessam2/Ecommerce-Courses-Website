import { Component } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: false,
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.css',
})
export class WhyChooseUs {
  protected features : Feature[] = [
    {
      icon: 'fa-solid fa-chalkboard-user',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with real-world experience building production applications.',
    },
    {
      icon: 'fa-solid fa-laptop-code',
      title: 'Hands-on Projects',
      description: 'Practice every concept with real projects, not just theory, so you build a portfolio as you learn.',
    },
    {
      icon: 'fa-solid fa-infinity',
      title: 'Lifetime Access',
      description: 'Enroll once and revisit any course whenever you need a refresher, at your own pace.',
    },
    {
      icon: 'fa-solid fa-certificate',
      title: 'Certificates',
      description: 'Earn a certificate of completion for every course to showcase your new skills.',
    },
  ] ;
}
