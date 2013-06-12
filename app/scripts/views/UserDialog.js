define([
	'views/ui/Dialog',
	'templates/profileTemplate'
], function(Dialog, profileTemplate){
	return Dialog.extend({
		profileTemplate: profileTemplate,
		options: {
			className: 'modal hide fade',
			content: 'User dialog',
			label: {
				id: 'modalLabel',
				text: ''
			},
			footer: {
				items: [
					{className: 'btn', hidden: true, dismiss: 'modal', text: 'close'}
				]
			}
		},
		initialize: function(){
			Dialog.prototype.initialize.call(this, Array.prototype.splice(arguments));
		},
		setContent: function(user){

			console.log(user, 'user');
			var content = this.profileTemplate({followersCount: user.followers_count, description: user.description});
			this.$el.find('#modalLabel').html(user.name);
			this.$el.find('.modal-body')
				.css({
					backgroundImage: 'url(' + user.profile_background_image_url + ')',
					backgroundColor: user.profile_background_color
				})
				.html(content);

			return this;
		}
	});
});