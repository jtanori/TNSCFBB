define([
	'jquery',
	'underscore',
	'backbone',
	'aspect',
	'templates/page',
	'templates/baseContent',
	'config'
], function($, _ , Backbone, aspect, baseTemplate, baseContent, config){
	return Backbone.View.extend({
		pageId: '',
		baseTemplate: baseTemplate,
		baseContent: baseContent,
		loadingIndicator: null,
		footer: {},
		header: {},
		scroll: null,
		dialog: null,
		refreshAfterMethods: [],//Override, refresh iScroll after these methods
		//Default back button event
		events: {
			'click #back-button':    'back'
		},
		
		initialize: function(){
			//TODO: Fix this, does not make much sense right now
			aspect.add(this, 'render', this.afterRender, 'after');
			//Refresh scroll container after these methods
			aspect.add(this, this.refreshAfterMethods, this.scrollRefresh.bind(this), 'after');

			//this.render();

			return this;
		},

		onClose: function(){
			aspect.remove(this, 'render', this.afterRender);
			aspect.remove(this, this.refreshAfterMethods, this.scrollRefresh.bind(this));
			document.removeEventListener('touchmove', this.preventDefault.bind(this), false);
		},

		back: function(event){
			event.preventDefault();
			window.history.back();
		},

		home: function(event){
      event.preventDefault();
      Backbone.history.navigate('/', {trigger: true, replace: true});
    },

		render: function(){
			//Page initial state
			var data = {
				pageId: this.pageId,
				className: this.className,
				title: '',
				header: this.header || '',
				content: this.baseContent(),
				//footer: this.footer || '',
				loadingIndicator: this.loadingIndicator || ''
			};
			var footer;

			var $body = $('body');
			//Remove booting indicator
			$('#app-boot').remove();
			$body.find('[data-role="page"]').remove();
			$body.append(this.baseTemplate(data));
			//Cache the page
			var $page = this.$page = $('#' + data.pageId);

			//Set as current view
			this.setElement($page[0]);
			//No fancy stuff for the momment
			//TODO: Manage transitions in a better way
			$page.show();
			//Cache te container region for easy access
			this.$content = $('[data-role=scroller]>.content');
			this.$header = this.$page.find('.ui-header');
			//this.$footer = $('#footer');//Footer is detached from page

			//Create scroll
			this.scroll = new iScroll('iscroll',{
        useTransition: !config.isAndroid,
        bounce: false,
        onBeforeScrollStart: function (e) {
          var target = e.target;
          while (target.nodeType != 1) target = target.parentNode;

          if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
            e.preventDefault();
        }
      });
      document.addEventListener('touchmove', this.preventDefault.bind(this), false);
			//Return instance to allow chainable calls
			return this;
		},

		preventDefault: function(e){
			e.preventDefault();
		},

		afterRender: function(){
			this.delegateEvents();
		},
		setTitle: function(title){
			var t = title || '';
			this.$header.find('.title h1').html(t);
			return this;
		},
		showError: function(title, errorMessage){
			var err = Handlebars.compile(errorTemplate);

			this.setTitle(title);
			this.$content.append(err({message: errorMessage, backButton: {href:'#', label: 'Back'}}));

		},

    signup: function(event){
    	event.preventDefault();

    	Backbone.history.navigate('#signup', {trigger: true});
    },

    scrollRefresh: function(){
    	if(this.scroll && this.scroll instanceof iScroll){
    		setTimeout(function(){
    			this.scroll.refresh();
    		}.bind(this), 200);
    	}
    }
	});
});