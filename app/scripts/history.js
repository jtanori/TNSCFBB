define([
'backbone',
'exceptions/Redirect'
], function(Backbone, Redirect){
	var originalLoadUrl = Backbone.History.prototype.loadUrl;

  Backbone.History.prototype.referer = {};
  Backbone.History.prototype.loadUrl = function (hash) {
    var ref = Backbone.History.prototype.referer;
    hash = hash || window.location.hash;
    //Save history referers for future usage
    ref.previous = ref.current;
    ref.current  = hash;
    
    try {
      return originalLoadUrl.apply(this, arguments); 
    } catch (e) {
      //if (e instanceof Redirect) {
      //  Backbone.history.navigate(e.url, {trigger: true});
      //}
      //else {
        Backbone.history.navigate('error', {trigger: true});
        console.error(e, e.message, e.stack); 
      //}
    }
  };
});