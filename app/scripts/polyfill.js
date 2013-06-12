define("polyfill", function(){
	//Creates polyfill for bind function.
	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (ctx) {
	        var that  = this;
	        var slice = Array.prototype.slice;
	        var args  = slice.call(arguments, 1);
	        
	        var fn = function () {
	            return that.apply(ctx, args.concat(slice.call(arguments)));
	        };
	        
	        return fn;
	    };
	}

	if(!String.prototype.capitalize){
		String.prototype.capitalize = function() {
    	return this.charAt(0).toUpperCase() + this.slice(1);
		}
	}
});