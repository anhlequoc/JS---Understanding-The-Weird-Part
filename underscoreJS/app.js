//using underscore.js _. là global object
var arr1 = [1,2,3];
var arr6 = _.map(arr1, function(item) {return item * 3;});
console.log(arr6);

var arr7 = _.filter([1,2,3,4,5,6,7], function(item) {return item%2 === 0;});
console.log(arr7);

// demo reflection and extend (lecture 56)
var person = {
  firstName: 'default',
  lastName: 'default',
  getFullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

var john = {
  firstName: "John",
  lastName: "Doe"
};

//just for demo purpose, don't do it ever!
john.__proto__ = person;

//reflection
for (var prop in john) { //for in sẽ lấy tất cả các prop của john, bao gồm cả từ john prototype
  if (john.hasOwnProperty(prop)) { //hasOwnProperty() chỉ lấy những prop của john, không bao gồm của john prototype
    console.log(prop + ": " + john[prop]);
  }
}

//extend
var jane = {
  address: "test address",
  getFormalFullNam: function() {
    return this.lastname + ', ' + this.firstname;
  }
};

var jim = {
  getFirstName: function() {
    return this.firstName;
  }
};

_.extend(john, jane, jim);
