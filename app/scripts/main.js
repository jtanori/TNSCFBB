(function() {
  'use strict';

  var root = this;
  var require = root.require;

  require.config({
    paths: {
      'hm':                  'vendor/hm',
	    'esprima':             'vendor/esprima',
	    'jquery':              'vendor/jquery.min',
      'jquery.cookies':      'vendor/jquery.cookies',
	    'underscore':          'vendor/underscore-min',
	    'backbone':            'vendor/backbone-min',
	    'aspect':              'vendor/aspect',
      'iscroll':             'vendor/iscroll',
      'codebird':            'vendor/codebird',
      'sha1':                'vendor/sha1',
	    'polyfill':            'polyfill',
      'config':              'config',
      'sync':                'sync',
      'mainRouter':          'routers/Main',
      'history':             'history',
      'jade':                'vendor/jade',
      'close':               'close',

      //Bootstrap plugins
      'bootstrap.transition': 'vendor/bootstrap/bootstrap-transition',
      'bootstrap.collapse':   'vendor/bootstrap/bootstrap-collapse',
      'bootstrap.modal':      'vendor/bootstrap/bootstrap-modal',
      'bootstrap.alert':      'vendor/bootstrap/bootstrap-alert'
    },

    shim: {

    	underscore: {
	  		exports: '_'
	  	},
	  	backbone: {
	  		deps: ['jquery', 'underscore'],
	  		exports: 'Backbone'
	  	},
      'backbone.validation': {
        deps: ['backbone'],
        exports: 'Backbone.Validation'
      },
	  	handlebars: {
	  		exports: 'Handlebars'
	  	},
      'jquery.cookies': {
        deps: ['jquery']
      },

      codebird: {
        deps: ['sha1'],
        exports: 'window.Codebird'
      },

      //Bootstrap shim
      'bootstrap.collapse': {
        deps: ['bootstrap.transition']
      },

      'bootstrap.alert': {
        deps: ['bootstrap.transition']
      },

      'bootstrap.modal': {
        deps: ['bootstrap.transition']
      }
    },
    //Timeout
    waitSeconds: 20


  });
  //Catch timeout errors
  requirejs.onError = function (err) {
      console.log(err.requireType, err, 'error');
      if (err.requireType === 'timeout') {
          console.log('modules: ' + err.requireModules);
      }

      throw err;
  };

  //Require main files
  require(
    [
      'jquery',
      'underscore',
      'backbone',
      'mainRouter',
      'config',
      'close',
      'sync',
      'jquery.cookies',
      'history',
      'polyfill'
    ],
    function($, _, Backbone, MainRouter, config) {
    	//Support json on cookie get/save
      $.cookie.json = true;

      //Initialize the application (but no the history, we will do that after token is ready)
      var router = root.App = new MainRouter();
      //Asign config module to main app
      router.config = config;
    }
  );//End main require
}).call(this);
