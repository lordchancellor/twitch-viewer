export class TwitchChannel {
	constructor(
		private thumb: string,
		public isLive: boolean,
		private title: string,
		private description: string,
		private url: string
	) { }
}
