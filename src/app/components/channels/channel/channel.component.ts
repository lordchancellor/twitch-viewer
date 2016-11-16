import { Component, Input } from '@angular/core';

import { TwitchChannel } from '../../../classes/twitch-channel';

@Component({
  selector: 'tv-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  @Input() channel: TwitchChannel;

  constructor() {
  }

}
