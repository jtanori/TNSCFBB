define(['../vendor/jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="navbar"><div class="navbar-inner"><a class="brand">' + escape((interp = title) == null ? '' : interp) + '</a></div></div>');
}
return buf.join("");
};
});