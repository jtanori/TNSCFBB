define(['../vendor/jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<p id="description">' + escape((interp = description) == null ? '' : interp) + '</p>');
 console.log(description);
buf.push('<h2 id="followersCount">' + escape((interp = followersCount) == null ? '' : interp) + '<small>followers</small></h2>');
}
return buf.join("");
};
});