import { Component } from '@angular/core';

@Component({
  selector: 'tv-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {

  constructor() { }

  search(input: any) {
    console.log('You have searched for', input.value);
    input.value = '';
  }

}
