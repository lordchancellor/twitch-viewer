import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ControlsComponent } from './components/controls/controls.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ChannelComponent } from './components/channels/channel/channel.component';

import { TwitchService } from './services/twitch.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    ChannelsComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [TwitchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
