"use strict";
function buildFunction2() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(
      (function(j) {
        return function(){
          console.log(j);
        };
      }(i))
    );
  }
  return arr;
}
var fs = buildFunction2();
fs[0](); //0
fs[1](); //1
fs[2](); //2

function buildFunction3() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    let j = i;
    arr.push(
      function() {
        console.log(j);
      }
    );
  }
  return arr;
}
var fs = buildFunction3();
fs[0](); //0
fs[1](); //1
fs[2](); //2
