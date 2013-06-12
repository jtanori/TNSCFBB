define(['../vendor/jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':(modal.id), 'role':("dialog"), 'aria-labelledby':(modal.label.id), 'aria-hidden':("true"), "class": (modal.className) }, {"id":true,"class":true,"role":true,"aria-labelledby":true,"aria-hidden":true}));
buf.push('><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">X</button><h3');
buf.push(attrs({ 'id':(modal.label.id) }, {"id":true}));
buf.push('>' + escape((interp = modal.label.text) == null ? '' : interp) + '</h3></div><div class="modal-body">' + escape((interp = modal.content) == null ? '' : interp) + '</div>');
 if(modal.footer)
{
buf.push('<div class="modal-footer">');
 if(modal.footer.items)
{
// iterate modal.footer.items
;(function(){
  if ('number' == typeof modal.footer.items.length) {
    for (var $index = 0, $$l = modal.footer.items.length; $index < $$l; $index++) {
      var button = modal.footer.items[$index];

buf.push('<button');
buf.push(attrs({ 'data-dismiss':(button.dismiss), 'aria-hidden':(button.hidden), "class": (button.className) }, {"class":true,"data-dismiss":true,"aria-hidden":true}));
buf.push('>');
 if(button.text) 
{
buf.push('' + escape((interp = button.text) == null ? '' : interp) + '');
}
 else if(button.HTMLConten) 
{
buf.push('! ' + escape((interp = button.HTMLContent) == null ? '' : interp) + '');
}
buf.push('</button>');
    }
  } else {
    for (var $index in modal.footer.items) {
      var button = modal.footer.items[$index];

buf.push('<button');
buf.push(attrs({ 'data-dismiss':(button.dismiss), 'aria-hidden':(button.hidden), "class": (button.className) }, {"class":true,"data-dismiss":true,"aria-hidden":true}));
buf.push('>');
 if(button.text) 
{
buf.push('' + escape((interp = button.text) == null ? '' : interp) + '');
}
 else if(button.HTMLConten) 
{
buf.push('! ' + escape((interp = button.HTMLContent) == null ? '' : interp) + '');
}
buf.push('</button>');
   }
  }
}).call(this);

}
buf.push('</div>');
}
buf.push('</div>');
}
return buf.join("");
};
});