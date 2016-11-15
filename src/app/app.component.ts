import { Component } from '@angular/core';

@Component({
  selector: 'tv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private liveOnly: boolean;

  viewToggled(liveOnly: boolean) {
    console.log('View changed ', liveOnly);
    this.liveOnly = liveOnly;
  }

}
