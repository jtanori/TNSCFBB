define([
	'jquery',
	'underscore',
	'backbone',
	'templates/error'
], function($, _, Backbone, template){
	return Backbone.View.extend({
		template: template,
		scroll: null,
		options: {
			message: ''
		},
		initialize: function(options){
			this.options = options;
			console.log('error', arguments);
		},
		render: function(){
			var content = Handlebars.compile(this.template);

			this.setElement(content(this.options));
			$('[data-role=page]').append(this.$el);

			return this;
		}
	});
});