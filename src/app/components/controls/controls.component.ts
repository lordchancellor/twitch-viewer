import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tv-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  search(input: any) {
    console.log('You have searched for', input.value);
    input.value = '';
  }

}
