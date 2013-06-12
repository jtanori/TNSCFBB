define(['../vendor/jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="ui-wrapper"><h1>An error occurred</h1>');
 if(message)
{
buf.push('<p>' + escape((interp = message) == null ? '' : interp) + '</p>');
}
 if(backButton)
{
buf.push('<a');
buf.push(attrs({ 'href':(backButton.href), "class": ("btn btn-large btn-block") }, {"class":true,"href":true}));
buf.push('>' + escape((interp = baclButton.label) == null ? '' : interp) + '</a>');
}
buf.push('</div>');
}
return buf.join("");
};
});