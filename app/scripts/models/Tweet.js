define([
	'backbone'
], function(Backbone){
	return Backbone.Model.extend({
		defaults: {
			name: "",
			thumbnail: "",
			text: "",
			date: "",
			retweeted: false,
			retweet_count: 0,
			profile_background_image_url: '',
			profile_background_color: '#fff',
			description: "",
			followers_count: 0
		},

		initialize: function(){
			console.log("Initialize Tweet model", this);
		}
	});
});