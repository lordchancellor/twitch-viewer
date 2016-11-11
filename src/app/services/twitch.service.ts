import { Injectable } from '@angular/core';
import { Response, Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitchService {

  apiBaseUrl: string = 'https://wind-bow.hyperdev.space/twitch-api/streams/';
  user: string = 'ESL_SC2';
  query: string = '?callback=?';

  defaultChannels: string[] = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  constructor(public jsonp: Jsonp) { }

  refresh(): Observable<string> {
    const apiCall: string = this.apiBaseUrl + this.user + this.query;

    return this.jsonp.get(apiCall)
          .map((res: Response) => res.json())
          .catch((err: any) => Observable.throw(err.json().err))
          .do(data => console.log("All: " + JSON.stringify(data)));
  }
}