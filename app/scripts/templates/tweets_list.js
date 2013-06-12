define(['../vendor/jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul id="tweets">');
// iterate tweets
;(function(){
  if ('number' == typeof tweets.length) {
    for (var $index = 0, $$l = tweets.length; $index < $$l; $index++) {
      var tweet = tweets[$index];

buf.push('<li');
buf.push(attrs({ 'data-user-id':(tweet.id), "class": ("clearfix") }, {"class":true,"data-user-id":true}));
buf.push('><a');
buf.push(attrs({ 'href':("#user/" + tweet.id), 'data-user-id':(tweet.id) }, {"href":true,"data-user-id":true}));
buf.push('><img');
buf.push(attrs({ 'src':(tweet.thumbnail), "class": ("thumbnail") }, {"class":true,"src":true}));
buf.push('/></a><div class="data push-left"><a');
buf.push(attrs({ 'href':("#user/" + tweet.id), 'data-user-id':(tweet.id) }, {"href":true,"data-user-id":true}));
buf.push('>' + escape((interp = tweet.name) == null ? '' : interp) + '</a><p>' + escape((interp = tweet.text) == null ? '' : interp) + '</p><span class="date">Postdate: ' + escape((interp = tweet.date) == null ? '' : interp) + ' Retweets: ' + escape((interp = tweet.retweet_count) == null ? '' : interp) + '</span></div></li>');
    }
  } else {
    for (var $index in tweets) {
      var tweet = tweets[$index];

buf.push('<li');
buf.push(attrs({ 'data-user-id':(tweet.id), "class": ("clearfix") }, {"class":true,"data-user-id":true}));
buf.push('><a');
buf.push(attrs({ 'href':("#user/" + tweet.id), 'data-user-id':(tweet.id) }, {"href":true,"data-user-id":true}));
buf.push('><img');
buf.push(attrs({ 'src':(tweet.thumbnail), "class": ("thumbnail") }, {"class":true,"src":true}));
buf.push('/></a><div class="data push-left"><a');
buf.push(attrs({ 'href':("#user/" + tweet.id), 'data-user-id':(tweet.id) }, {"href":true,"data-user-id":true}));
buf.push('>' + escape((interp = tweet.name) == null ? '' : interp) + '</a><p>' + escape((interp = tweet.text) == null ? '' : interp) + '</p><span class="date">Postdate: ' + escape((interp = tweet.date) == null ? '' : interp) + ' Retweets: ' + escape((interp = tweet.retweet_count) == null ? '' : interp) + '</span></div></li>');
   }
  }
}).call(this);

buf.push('</ul>');
}
return buf.join("");
};
});