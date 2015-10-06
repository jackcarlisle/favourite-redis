var Favourites = (function(){

function delReq(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    callback(oReq.responseText);
  });
  oReq.open("DELETE", "/", true);
  oReq.send();
}

function callback(res){
  console.log("send");
  document.write(res);
}

document.getElementById("clear").addEventListener("click", delReq);

return {
  delReq: delReq
};


})();
