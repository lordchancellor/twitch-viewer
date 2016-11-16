import { Injectable } from '@angular/core';
import { Response, Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitchService {

  apiBaseUrl: string = 'https://wind-bow.hyperdev.space/twitch-api/';
  query: string = '?callback=JSONP_CALLBACK';

  defaultChannels: string[] = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  constructor(public jsonp: Jsonp) { }

  getChannel(channel: string): Observable<any> {
    const apiCall: string = this.apiBaseUrl + 'channels/' + channel + this.query;

    return this.jsonp.get(apiCall)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw(err.json().err));
  }

  getStream(channel: string): Observable<any> {
    const apiCall: string = this.apiBaseUrl + 'streams/' + channel + this.query;

    return this.jsonp.get(apiCall)
        .map((res: Response) => res.json())
        .catch((err: any) => Observable.throw(err.json().err));
  }
}