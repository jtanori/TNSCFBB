/**
 * The Index view
 */
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'templates/index',
    'aspect'
  ],
  function($, _, Backbone, Page, template, aspect) {
    return Page.extend({
      pageId: 'home',
      template: template,
      className: 'home-view',
      options:{
        title: 'Twitter Test'
      },
      events: {
        "click #auth": 'auth'
      },
      header: null,
      refreshAfterMethods: [
        'fillContent'
      ],
      initialize: function(options){
        Page.prototype.initialize.call(this, Array.prototype.slice(arguments));
        //TODO: Show loading indicator and fetch needed data
        //      Made this an async call called by model/collection 
        aspect.add(this, 'render', this.fillContent, 'after', true);

        //this.fillContent();
      },
      onClose: function(){
        aspect.remove(this, 'render', this.fillContent, 'after');
      },
      fillContent: function(){
        //create template
        this.$content.append(this.template());

        return this;
      },
      //Auth? not really
      auth: function(e){
        e.preventDefault();
        
        Backbone.history.navigate('#tweets', {trigger: true});
      }
    });
  }
);