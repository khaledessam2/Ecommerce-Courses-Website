import { Component, inject } from '@angular/core';
import { Loader } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  protected LoaderService : Loader = inject(Loader) ;

}
