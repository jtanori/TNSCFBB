define(['../vendor/jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="label loading-indicator"><div class="wrapper clearfix"><i class="icon-refresh icon-white spinner pull-left"></i><div class="text pull-left">' + escape((interp = label) == null ? '' : interp) + '</div><div class="btn btn-link close-indicator pull-right"></div></div></div>');
}
return buf.join("");
};
});