import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skelton',
  standalone: false,
  templateUrl: './skelton.html',
  styleUrl: './skelton.css',
})
export class Skelton {
  @Input() width = '100%';
  @Input() height = '20px';
  @Input() borderRadius = '6px';
}
