import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toaster',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {
  toastService = inject(ToastService);
}
