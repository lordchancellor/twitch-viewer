import { browser, element, by } from 'protractor';

export class TwitchViewerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tv-root h1')).getText();
  }
}
