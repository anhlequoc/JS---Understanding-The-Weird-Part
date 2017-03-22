//using underscore.js _. là global object
var arr1 = [1,2,3];
var arr6 = _.map(arr1, function(item) {return item * 3;});
console.log(arr6);

var arr7 = _.filter([1,2,3,4,5,6,7], function(item) {return item%2 === 0;});
console.log(arr7);


_.filter = _.select = function(obj, predicate, context) {
  var results = [];
  predicate = cb(predicate, context);
  _.each(obj, function(value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
};

_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
  _['is' + name] = function(obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});
