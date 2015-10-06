var redis = require('./db.js'), querystring = require('querystring');
var port = 7000;

var Route = (function(){

  var indexTop = '<!DOCTYPE html><html><head></head><body><h5>My Favourite Things</h5><form method="post" action="/"><input type="text" name="item"><input type="submit"></form><button id="clear">Clear All</button><ul class="favourite-things">';
  var indexBottom = '</ul><script src="./js/favourites.js"></script></body></html>';
  var indexList = '';
  var wholeHtml = '';
  function htmlFavourites(arr){
    indexList = '';
//console.log(arr);
    arr.forEach(function(item){
      indexList += '<li>'+item+'</li>';
    });
    wholeHtml = indexTop+indexList+indexBottom;
    return wholeHtml;
    //return wholeHtml;
  }

function getFavourites(modify, callback){
  redis.lrange('favourites', 0, -1, function(err, reply) {
    if (err) {
        console.log(err);
    } else {
      var result = modify(reply);
      callback(result);
    }
  });

}

function postFavourites(item){
  redis.rpush("favourites", item, function(err, reply) {
    if (err) {
        console.log(err);
    } else {
        console.log(reply);
    }
});

}

function translatePost(req, callback){
    var body = "";
    req.on('data', function(data){
      body += data;
      if(body.length > 1e6){
        req.connection.destroy();
      }
    });
    req.on('end', function(){
      var POST = querystring.parse(body);
      callback(POST.item);
    });
  }

  function clearList(){
    redis.del('favourites', function(err, reply) {
    console.log(reply);
});
  }


return {
  postFavourites: postFavourites,
  getFavourites: getFavourites,
  translatePost: translatePost,
  clearList: clearList,
  htmlFavourites: htmlFavourites
};

})();

module.exports = Route;
