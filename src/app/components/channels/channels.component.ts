import { Component, OnInit, OnDestroy } from '@angular/core';

import { TwitchChannel } from '../../classes/twitch-channel';
import { TwitchService } from '../../services/twitch.service';

@Component({
  selector: 'tv-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channels: TwitchChannel[] = [];
  defaultChannels: string[];
  
  channelObj: any = {};
  streamObj: any = {};

  starcraftChannel: any = {};
  
  data: string;
  errorMessage: any[];

  constructor(public twitchService: TwitchService) {
    this.defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    this.twitchService.getChannel(this.defaultChannels[0])
      .subscribe(
        data => this.channelObj = data
      );

    this.twitchService.getLiveStatus(this.defaultChannels[0])
      .subscribe(
        data => this.streamObj = data
      );
  }

  ngOnInit() {
    this.twitchService.getChannel(this.defaultChannels[0]).subscribe(
      data => {
        this.starcraftChannel.logo = data.logo;
        this.starcraftChannel.title = data.display_name;
        this.starcraftChannel.description = data.status;
        this.starcraftChannel.url = data.url;
      }
    );

    this.twitchService.getLiveStatus(this.defaultChannels[0]).subscribe(
      res => this.starcraftChannel.isLive = res.stream !== null
    );
   
    for (let channel of this.defaultChannels) {
      let logo: string;
      let title: string;
      let description: string;
      let isLive: boolean;
      let url: string;
 
      this.twitchService.getChannel(channel)
        .subscribe(res => {
          logo = res.logo;
          title = res.display_name;
          description = res.status;
          url = res.url;
        });

      this.twitchService.getLiveStatus(channel)
        .subscribe(res => {
          isLive = !res.stream === null;
        });

      this.channels.push(
        new TwitchChannel(logo, isLive, title, description, url)
      );
	  }
  }

  ngOnDestroy() {

  }

  buildStarcraft() {
    this.channels.push(
      new TwitchChannel(
        this.starcraftChannel.logo,
        this.starcraftChannel.isLive,
        this.starcraftChannel.title,
        this.starcraftChannel.description,
        this.starcraftChannel.url
      )
    );
  }

  logChannel() {
    console.log(this.channelObj);
  }

  logStream() {
    console.log(this.streamObj);
  }
}
