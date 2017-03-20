
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
