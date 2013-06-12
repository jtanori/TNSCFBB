define([
	'backbone',
	'config'
], function(Backbone, config){
	return Backbone.Model.extend({
		defaults: {
			access_token: '',
			token_type: 'bearer',
			httpstatus: 403
		},
		ready: false,
		url: '',
		initialize: function(data, options){
			//Make sure we have twitter client
			if(options.client) this.client = options.client;
			else throw "No Twitter client defined";
			
			//Ready to save data to localstorage for later usage
			this.on('success', this.saveToLocal, this);

			var savedToken = $.cookie('token');
			//Load data form local
			if(savedToken){
				this.set(savedToken);
				this.ready = true;
				this.trigger('ready');
			}else{
				//Load data from server
				this.fetch();
			}

		},
		fetch: function (options) {
			this.client.__call(
			    'oauth2_token',
			    {},
			    function (reply) {
			    		this.set(reply);
			        this.trigger('success', reply);
			    }.bind(this)
			);
		},
		parse: function(response){
			return response;
		},
		//Tells when the token is loaded/ready
		isReady: function(){
			return this.ready;
		},
		isExpired: function(){
			var now = (new Date())*1;
			var expires = this.get('expiration_timestamp');

			return (now - expires) > 0;
		},
		//Set state as not ready and fetch data again
		reload: function(){
			this.ready = false;
			this.fetch();
		},
		saveToLocal: function(){
			console.log('save to local');
			if(!this.isExpired()){
				var expires = this.get('expiration_timestamp');
				var date = new Date();

				date.setTime(expires);
				//TODO: Set expiration based on token or access_token
				$.cookie('token', this.toJSON(), {expires: date});
				this.ready = true;
				this.trigger('ready');
			}
		},
		destroy: function(){
			this.clear();
			$.cookie('token', null);
		}
	});
});