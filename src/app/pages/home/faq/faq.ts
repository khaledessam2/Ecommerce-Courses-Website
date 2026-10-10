import { Component } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  faqs : FaqItem[] = [
    {
      question: 'Do I need any prior experience to start?',
      answer:
        'No. Our courses start from the basics and gradually move to advanced topics, so complete beginners are welcome.',
    },
    {
      question: 'Do I get a certificate after finishing a course?',
      answer:
        'Yes, you receive a certificate of completion for every course you finish, which you can add to your portfolio or resume.',
    },
    {
      question: 'How long do I have access to a course?',
      answer:
        'Once you enroll in a course, you have lifetime access and can revisit the material whenever you need a refresher.',
    },
    {
      question: 'Can I get a refund if the course is not what I expected?',
      answer:
        'Yes, we offer a refund within 14 days of purchase if you are not satisfied with the course content.',
    },
  ] ;

  activeIndex : number | null = 0 ;

  toggle(index: number) {
    // this.activeIndex = this.activeIndex === index ? null : index;
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
