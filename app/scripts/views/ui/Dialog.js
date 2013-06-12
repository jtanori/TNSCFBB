define([
	'jquery',
	'backbone',
	'templates/dialog',
	'bootstrap.modal'
], function($, Backbone, template){
	return Backbone.View.extend({
		tmpl: template,
		attachTo: 'body',//valid CSS selector
		//Override
		options: {
			className: 'modal hide fade',
			content: '...',
			label: {
				id: 'modalLabel',
				text: 'default label'
			},
			footer: {
				items: [
					{className: 'btn btn-primary', hidden: true, dismiss: 'dialog', text: 'close'}
				]
			}
		},
		initialize: function(options){
			this.render();

			this.$el.on('hidden', this.close.bind(this));

			return this;
		},
		render: function(){

			var content = template({modal: this.options});
			this.setElement(content);

			return this.$el;
		},
		show: function(){
			console.log('show', this.$el);
			this.$el.modal('show');

			return this;
		},
		hide: function(){
			this.$el.modal('hide');
			this.close();

			return this;
		},
		onClose: function(){
			console.log('dialog close');
			this.$el.off('hidden');
			Backbone.history.navigate('', {replace: true});
		}
	});
});