define([
	'backbone',
	'config'
], function(Backbone, config){
	var originalSync = Backbone.sync;
	//Override sync
	Backbone.sync = function(method, model, options){

		var options = options || {};
		//Extend options from here
		
		options.beforeSend = function(xhr){
			//Add application key
			console.log(config.API.KEY, 'key');
			//xhr.setRequestHeader('Authorization', config.API.KEY);
			//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
			console.log(xhr, 'xhr');
		};
		//Return original call to sync
		return originalSync(method, model, options);
	}
});