define(
    [
        'backbone', 'aspect', 'config',
        'views/Page',
        'views/Index', 'views/Tweets',
        //Collections
        'collections/Tweets',
        //Models
        'models/Token',
        
        'views/Error',
        'views/ui/LoadingIndicator',
        'exceptions/Redirect',
        'iscroll'
    ], 
    function (
        Backbone, aspect, config,
        //Page view
        Page,
        //Home
        IndexView, Tweets,
        //Collections
        TweetsCollection, Token,

        ErrorView,
        Indicator,
        Redirect,
        iScroll) {
        //we need to get the CategoryModel this way to avoid loading time issues
        var MainRouter = Backbone.Router.extend({
                routes: {
                    '':       'defaultAction',
                    'home':   'defaultAction',
                    'tweets': 'tweets'
                },
                currentView: null,
                user: null,
                footer: null,

                /**
                * Overridden because of aspects.
                *
                * @overridden
                */
                _bindRoutes: function() {
                    if (!this.routes) {
                      return; 
                    }

                    // Added only this method call to orginal _bindRoutes.
                    // The reason of that is to decorated original route handlers.
                    this.addAspectsToRoutes();

                    var routes = [];
                    for (var route in this.routes) {
                      routes.unshift([route, this.routes[route]]);
                    }
                    for (var i = 0, l = routes.length; i < l; i++) {
                      this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
                    }
                },

                addAspectsToRoutes: function () {
                    /*Use aspect to decorate views
                    i.e: view requires some data to be present before proceeding with the route
                    */
                    //Full pages
                    var pageMethodsList = [
                      'defaultAction',
                      'tweets'
                    ];

                    //TODO: Implement user status (login) checkout
                    /**
                     * For usage:  
                     * @see js/libs/aspect.js
                     */
                    //Let's protect it
                    var beforeMethods = function(){
                    	//Do pre page validations
                    	this.currentView && this.currentView.close();
                    }.bind(this);
                    //Protected too
                    var afterMethods = function(){
                      //After page stuff (e.g. check if footer needs to be in place, cleanup, etc...)
                    }.bind(this);

                    //Remove current page before entering this methods
                    aspect.add(this, pageMethodsList, beforeMethods);
                    //Set page
                    aspect.add(this, pageMethodsList, afterMethods, 'after');
                },
                //When user is ready, app is ready too
                initialize: function () {

              		var token = this.getToken(); 
              		var scrollRefresh = function(){
	                  var scroll = this.currentView && this.currentView.scroll;

	                  if(iscroll){
	                    scroll.refresh();
	                  }

	                  return this;
	                };
	                //starts history and router with it
	                var init = function(){
                        console.log('init', arguments);
	                	//Start history if no other module has doneit
                        if(!Backbone.History.started) Backbone.history.start();	
	                }.bind(this);

                  //Bind scroll refresh event
                  Backbone.on('page.scroll.refresh', scrollRefresh, this);
                  //cache
                  this.$body = $('body');

                  if(token.isReady()){
                  	init();
                  }else{
                  	this.listenTo(token, 'ready', init);
                  }
                },

                getToken: function(){
                    var token = this.token;
                    var client;

                    if (!this.token) {
                        //USe codebird for speed
                        client = new Codebird();
                        client.setConsumerKey(config.API.KEY, config.API.SECRET);
                        client.setToken(config.API.TOKEN, config.API.TOKEN_SECRET);
                        //Best approach here is to have a proxy
                        this.token = token = new Token(null, {
                            client: client
                        });
                    }

                    return token;
                },
                /*
                * Le home "controller"
                */
                defaultAction: function() {
                    var view = this.currentView = new IndexView();
                    view.render();
                },
                /*
                * Tweet list page
                *
                */
                tweets: function(){
                    var token = this.getToken();
                	var collection = new TweetsCollection();
                	var view = this.currentView = new Tweets({
                		collection: collection
                	});
                    view.render()
                    //Get the tweets
                    token.client.__call(
                        'search_tweets',
                        {q: '#SNCF', count: 30},
                        function (reply) {
                            //Manually add the models
                            var models = this.parse(reply);
                            this.reset(models);

                        }.bind(collection),
                        true // this parameter required
                    );
                }
            });
        return MainRouter;
});