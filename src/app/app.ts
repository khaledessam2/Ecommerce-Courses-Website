import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AuthServices } from './shared/services/Auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App implements OnInit {
  private AuthService : AuthServices = inject(AuthServices) ;

  ngOnInit(): void {
    this.AuthService.autoLogin() ;
  }
}
