define([
	'backbone',
	'models/Tweet',
	'config'
], function(Backbone, Tweet, config){
	return Backbone.Collection.extend({
		model: Tweet,
		_q: '',
		_rpp: 30,
		url: function(){
			return config.API.TWITTER + "search.json?q=" + this._q + "&rpp=" + this._rpp
		},
		initialize: function(){
			console.log('Initialize Tweet collection')
		},
		parse: function(r){
			var tweets = [];

			if(r.search_metadata) this.metadata = r.search_metadata;

			if(r.statuses && r.statuses.length){
				_.each(r.statuses, function(status, i){
					var user = status.user;

					tweets.push({
						id:            status.id,
						text:          status.text,
						retweeted:     status.retweeted,
						retweet_count: status.retweet_count,
						date:          status.created_at,
						name:          user.screen_name,
						thumbnail:     user.profile_image_url,
						profile_background_image_url: user.profile_background_image_url,
						profile_background_color:     user.profile_background_color,
						description:      user.description,
						followers_count:  user.followers_count
					});
				});
			}

			return tweets;
		}
	});
});