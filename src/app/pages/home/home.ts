import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private ActivatedRoute : ActivatedRoute = inject(ActivatedRoute) ;

  ngOnInit(): void {
    // fragment is return an Observable ;
    this.ActivatedRoute.fragment.subscribe({
      next:(value : string | null)=> {
        this.jumpToSection(value) ;
      },
    })
  }

  jumpToSection(section : string | null){
    if(!section) return ;
    document.getElementById(section)?.scrollIntoView({
      behavior : "smooth"
    })
  }
}
