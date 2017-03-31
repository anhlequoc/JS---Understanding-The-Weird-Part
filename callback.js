
/*hỏi Duy vụ này*/
function tellMeWhenDone(callback) {
  var a = 1000; //some work
  var b = 2000; //some work
  console.log(b);
  return function() {
    console.log(a);
  }; //the 'callback', it runs the function I give it!
}

var tell1 = tellMeWhenDone(true);
console.log('he');
var tell2 = tellMeWhenDone(false);

tell1();
tell2();

//


function buildFunction2() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(
      (function(j) {
        console.log(j); //- có dòng này sẽ chạy ngay khi push vào arr, ko cần phải invoke
      } //immediate invoke function: push f1 -> execute f1 -> push f2 -> execute f2 -> push f3 -> execute f3
      )
    );
  }
  console.log(arr);
  return arr;
}
var fs = buildFunction2();
fs[0](0); //0
fs[1](1); //1
fs[2](2); //2
