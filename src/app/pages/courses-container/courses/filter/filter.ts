import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  // two-way bound selected filter : [(Selected)]="..."
  @Input() Selected : string = 'all' ;
  @Output() SelectedChange = new EventEmitter<string>() ;
  @Input() All : number = 0 ;
  @Input() Free : number = 0 ;
  @Input() premium : number = 0 ;
  ChangeSelectedRadioButton(event : Event){
    this.Selected = (event.target as HTMLInputElement).value ;
    this.SelectedChange.emit(this.Selected) ;
  }
}
