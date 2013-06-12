define(['../vendor/jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'data-role':("page"), 'id':(pageId), "class": (className) }, {"data-role":true,"class":true,"id":true}));
buf.push('>');
 if (content)
{
buf.push('' + ((interp = content) == null ? '' : interp) + '');
}
buf.push('</div>');
}
return buf.join("");
};
});