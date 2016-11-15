import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TwitchChannel } from '../../../classes/twitch-channel';

@Component({
  selector: 'tv-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() channel: TwitchChannel;
  @Output() liveStatus = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    this.liveStatus.emit(this.channel.isLive);
  }

}
