import Request from 'superagent';

export function trackingWithBrightcove(type, urlBrightCove, duration){
	console.log('trackingWithBrightcove');
	var apiBrightCove = 'http://metrics.brightcove.com/v2/tracker?';

	Request.get(urlBrightCove)
		.end((err, res) => {
			if(res.text) {
				var matches = res.text.match(/\bhttps?:\/\/\S+/gi);
				if(!_.isUndefined(matches) && matches.length > 0) {
					// return matches[0];
					var result = JSON.parse('{"' + decodeURI(matches[0].replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
					if(!_.isUndefined(result.pubId) && !_.isUndefined(result.videoId)){
						var params = 'event=' + type + '&domain=videocloud&video=' + result.videoId + '&account=' + result.pubId;

						if (type === 'video_engagement') {
							params += '&video_duration=' + duration; //Ask params range
							params += '&device_type=' + 'web';
						}

						Request.get(apiBrightCove + params)
							.end((err, res) => {
								if(!_.isUndefined(err) && err != null) {
									console.log('Have error when send tracking with Brightcove :',  err);
								}
							});
					}
				}
			}
		});
}