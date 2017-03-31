class Person {
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  greet() {
    return "Hi " + firstName;
  }
  bye() {
    return "bye bye";
  }
}

class InformalPerson extends Person {
  constructor (firstName, lastName) {
    super(firstName, lastName);
  }

  greet() {
    return "Yo " + firstName;
  }
}

var john = new Person("John", "Doe");
var jane = new InformalPerson("Jane", "Jane");
for(var prop in jane){
  console.log(prop)
}

//example only, don't use in practice
console.log(jane.__proto__);//return firstName, lastName, greet()
console.log(jane.__proto__.__proto__);//return firstName, lastName, greet(), bye()
