/**
 * The Tweets view
 */
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'views/UserDialog',
    'templates/tweets',
    'templates/tweets_list',
    'aspect'
  ],
  function($, _, Backbone, Page, UserDialog, template, tweetsList, aspect) {
    return Page.extend({
      pageId: 'tweets',
      template: template,
      listTemplate: tweetsList,
      dialog: new UserDialog(),
      className: 'tweets-view',
      title: 'Tweets',
      options:{
        title: 'Twitter Test'
      },
      events: {
        'click li a': 'user'
      },
      header: null,
      refreshAfterMethods: [
        'fillContent'
      ],
      initialize: function(options){
        Page.prototype.initialize.call(this, Array.prototype.slice(arguments));
        //Fill content on collection reset
        this.listenTo(this.collection, 'reset', this.fillList.bind(this));
        //this.listenTo(this.dialog, 'show', this.fillUser.bind(this));
        //this.listenTo(this.dialog, 'hidden', this.clearUser.bind(this));
      },
      render: function(){
        Page.prototype.render.call(this);
        this.fillContent();
      },
      onClose: function(){
        aspect.remove(this, 'render', this.fillContent, 'after');
      },
      fillContent: function(){
        //create template
        this.$content.append(this.template({title: this.title, label: "Loading tweets..."}));

        console.log('fill content');
        return this;
      },

      fillList: function(){
        console.log('fill list');
        var content = this.listTemplate({tweets: this.collection.toJSON()});
        $('#tweets_container').html(content);
      },

      user: function(e){
        event.preventDefault();

        var user = $(e.target).is('a') ?  $(e.target).attr('data-user-id'): $(e.target).parents('li').attr('data-user-id');
        var model = this.collection.get(user);
        //Display user data
        this.dialog.setContent(model.toJSON()).show();

      }
    });
  }
);