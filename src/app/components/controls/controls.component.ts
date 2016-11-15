import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tv-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  private liveOnly: boolean;
  @Output() viewToggled = new EventEmitter<boolean>();

  constructor() {
    this.liveOnly = false;
  }

  ngOnInit() {
  }

  search(input: any) {
    console.log('You have searched for', input.value);
    input.value = '';
  }

  toggleViewOption() {
    this.liveOnly = !this.liveOnly;
    this.viewToggled.emit(this.liveOnly);
  }


}
