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
  defaultChannels: string[];
  
  channelInfo;
  liveStatus;
  
  data: string;
  errorMessage: any[];

  constructor(public twitchService: TwitchService) {
    this.twitchService.getChannel('freecodecamp')
      .subscribe(
        data => this.channelInfo = data
      );

    this.twitchService.getLiveStatus('freecodecamp')
      .subscribe(
        data => this.liveStatus = data
      );





    /*this.channels = [
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
    ];*/

  }

  ngOnInit() {
    this.defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    this.twitchService.refresh().subscribe(
      val => this.data = val,
      error =>  this.errorMessage = <any>error);

    for (let channel of this.defaultChannels) {
      let logo: string;
      let title: string;
      let description: string;
      let isLive: boolean;
 
      this.twitchService.getChannel(channel)
        .subscribe(res => {
          logo = res.logo;
          title = res.display_name;
          description = res.status;
        });

      this.twitchService.getLiveStatus(channel)
        .subscribe(res => {
          isLive = !res.stream === null;
        });

      this.channels.push(
        new TwitchChannel(logo, isLive, title, description)
      );
	  }
  }

  logTwitchData() {
    //console.log(this.data);
    console.log(`Channel Info: `);
    console.log(this.channelInfo);
    console.log(`Live Status:`);
    console.log(this.liveStatus);

    console.log(this.channelInfo.logo,
          !this.liveStatus.stream === null,
          this.channelInfo.display_name,
          this.channelInfo.status);
  }

  ngOnDestroy() {
    //this.twitchService.refresh().unsubscribe();
  }
}
