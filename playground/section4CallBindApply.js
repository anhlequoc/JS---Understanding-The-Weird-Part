var person = {
  firstName: "Anh",
  lastName: "Le",
  getFullName: function () {
    var fullName = this.firstName + this.lastName;
    return fullName;
  }
}

var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
  console.log('Arguments: ' + lang1 + ' '+ lang2);
  console.log('-------');
}

var logPersonName = logName.bind(person);
logPersonName('en');
logName.call(person, 'en', 'es');
logName.apply(person, ['en', 'es']);

//function currying

function multiply (a, b) {
  return a * b;
}

var multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4));
