define([
	'backbone',
	'templates/loadingIndicator'
], function(Backbone, template){
	return Backbone.View.extend({
		id: 'loadingIndicator',
		class: 'overlay',
		attachTo: 'body',
		template: template,
		options: {
			openOnRender: true,
			label: 'Loading...'
		},
		initialize: function(options, attrs){
			this.render();
		},

		render: function(){
			var opts = this.options;

			this.$el.append(this.template({label: opts.label}));

			if(opts.hasOwnProperty('openOnRender') && opts.openOnRender) return $(this.attachTo).append(this.$el.show());
			else return this.$el;
		},

		open: function(){
			return this.$el.show();
		},

		hide: function(){
			return this.$el.hide();
		}
	});
});