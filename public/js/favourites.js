var Favourites = (function(){

function delReq(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("DELETE", "/", true);
  oReq.send();
}

function callback(){
  console.log("send");
}

document.getElementById("clear").addEventListener("click", delReq);

return {
  delReq: delReq
};


})();
