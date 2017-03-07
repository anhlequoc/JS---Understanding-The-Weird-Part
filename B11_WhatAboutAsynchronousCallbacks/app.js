greet();
function greet() {
  console.log('hi');
}

anonymousGreeet(); //cause error
var anonymousGreeet = function() {
  console.log('hi');
};
