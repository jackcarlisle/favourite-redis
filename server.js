var http = require('http'), fs = require('fs'), Route = require('./route.js'), querystring = require('querystring');
var port = 7000;
var index = fs.readFileSync(__dirname + '/public/index.html');
var favouritesjs = fs.readFileSync(__dirname + '/public/js/favourites.js');


var Server = (function() {

function startServer(){
http.createServer(handler).listen(port);
}

function handler(req, res) {
  function sendResponse() {

    res.writeHead(200, {"Content-Type":"text/html"});
    Route.getFavourites(Route.htmlFavourites, function(data){
console.log(data);
      res.end(data);
    });
  }
  var url = req.url;
  var urlArr = url.split("/");
  console.log(req.method);
  if(urlArr[2] === "favourites.js"){
    res.end(favouritesjs);
  }
  if(urlArr.length === 2){
    if(req.method === "GET"){
      console.log("user wants list");
      sendResponse();
    }
    if(req.method === "POST"){
      Route.translatePost(req, Route.postFavourites);
      sendResponse();
    }
    if(req.method === "DELETE"){
      console.log("something");
      Route.clearList(sendResponse);
    }

}

}




return {
  startServer: startServer,
  handler: handler
};

})();

module.exports = Server;
