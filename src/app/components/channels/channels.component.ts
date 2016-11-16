import { Component, OnInit } from '@angular/core';

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
  
  errorMessage: any[];

  constructor(public twitchService: TwitchService) {
    this.defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  }

  ngOnInit() {
    for (let channel of this.defaultChannels) {
      let isLive: boolean;
      let isDiscontinued: boolean;
      let status: string;
      let image: string;
      let channelName: string;

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
          channelName = isDiscontinued ? channel : res.display_name;

          this.channels.push(
            new TwitchChannel(
              image,
              isLive,
              channelName,
              status,
              res.url
            )
          );
        }
      );
    }
  }
}
