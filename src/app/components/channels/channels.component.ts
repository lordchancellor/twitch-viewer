import { Component, OnInit, OnDestroy } from '@angular/core';

import { TwitchChannel } from '../../classes/twitch-channel';
import { TwitchService } from '../../services/twitch.service';

@Component({
  selector: 'tv-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channels: TwitchChannel[];
  val: string;
  errorMessage: any;

  constructor(public twitchService: TwitchService) {
    this.channels = [
      new TwitchChannel(
        'http://www.wallpaperbetter.com/wallpaper/230/622/534/starcraft-ii-heart-of-the-swarm-1080P-wallpaper-thumb.jpg',
        true,
        'StarCraft II',
        'We all love StarCraft 2!!'
      ),
      new TwitchChannel(
        'http://www.wallpaperbetter.com/wallpaper/230/622/534/starcraft-ii-heart-of-the-swarm-1080P-wallpaper-thumb.jpg',
        false,
        'StarCraft II',
        'We all love StarCraft 2!!'
      ),
      new TwitchChannel(
        'http://www.wallpaperbetter.com/wallpaper/230/622/534/starcraft-ii-heart-of-the-swarm-1080P-wallpaper-thumb.jpg',
        true,
        'StarCraft II',
        'We all love StarCraft 2!!'
      )
    ];
  }

  ngOnInit() {
    this.twitchService.refresh().subscribe(
      val => this.val = val,
      error =>  this.errorMessage = <any>error);
  }

  logTwitchData() {
    console.log(this.val);
  }

  ngOnDestroy() {
    //this.twitchService.refresh().unsubscribe();
  }
}
