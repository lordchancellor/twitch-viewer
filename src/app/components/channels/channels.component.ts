import { Component, OnInit, OnDestroy, Input } from '@angular/core';

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
    this.defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

    this.twitchService.getChannel(this.defaultChannels[0])
      .subscribe(
        data => this.channelObj = data
      );

    this.twitchService.getStream(this.defaultChannels[0])
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

    this.twitchService.getStream(this.defaultChannels[0]).subscribe(
      res => this.starcraftChannel.isLive = res.stream !== null
    );

    for (let channel of this.defaultChannels) {
      let isLive: boolean;
      let isDiscontinued: boolean;
      let status: string;
      let image: string;

      this.twitchService.getStream(channel).subscribe(
        res => {
          isLive = res.stream !== null && res.stream !== undefined;
          isDiscontinued = res.stream === undefined;
        }
      );

      this.twitchService.getChannel(channel).subscribe(
        res => {
          if (isDiscontinued) {
            status = 'Channel no longer available';
          }
          else {
            status = isLive ? res.status : 'Offline';
          }

          image = isDiscontinued ? '/assets/images/testcard.jpg' : res.logo;

          this.channels.push(
            new TwitchChannel(
              res.logo,
              isLive,
              res.display_name,
              status,
              res.url
            )
          );
        }
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
