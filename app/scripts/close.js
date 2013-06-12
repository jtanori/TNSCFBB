define([
	'backbone'
], function(Backbone){
	Backbone.View.prototype.close = function(){
	  this.unbind();
	  if (this.onClose){
	    this.onClose();
	  }
	  this.remove();
	}
});