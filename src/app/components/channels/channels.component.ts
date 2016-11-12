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
  
  channelInfo;
  liveStatus;

  starcraftChannel: any = {};
  
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
  }

  ngOnInit() {
    this.defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    this.twitchService.refresh().subscribe(
      val => this.data = val,
      error =>  this.errorMessage = <any>error);

    this.twitchService.getChannel(this.defaultChannels[0]).subscribe(
      data => {
        this.starcraftChannel.logo = data.logo;
        this.starcraftChannel.title = data.display_name;
        this.starcraftChannel.description = data.status;
      }
    );

    this.twitchService.getLiveStatus(this.defaultChannels[0]).subscribe(
      res => this.starcraftChannel.isLive = !res.stream === null
    );

   
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

  buildStarcraft() {
    this.channels.push(
      new TwitchChannel(
        this.starcraftChannel.logo,
        this.starcraftChannel.isLive,
        this.starcraftChannel.title,
        this.starcraftChannel.description
      )
    );
  }
}
