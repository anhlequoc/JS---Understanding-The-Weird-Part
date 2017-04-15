## Object-Oriented Javascript and Prototypal Inheritance

### Classical vs Prototypal Inheritance
  > Inheritance: one obj gets access to the properties and methods of another object
  > Classical Inheritance: is about most known and popular, such as in C#, Java...has been done for a long time -> build a large, huge collections, objects...it would be so hard to firgure out how it's going
  > Prototypal: Inheritance is much simpler, it's flexible, extensible, easy to understand

### Understanding the Prototype
  > All objects (incl function) have a prototype property: obj.prototype. the prototype is simply a reference to another object, call it as "proto"

  ```javascript
  var person = {
    firstName: 'default',
    lastName: 'default',
    getFullName: function() {
      return this.firstName + " " + this.lastName;
    }
  };

  var John = {
    firstName: "John",
    lastName: "Doe"
  }

  //just for demo purposes!!! don't do this ever!
  John.__proto__ = person; //gán prototype của John là person
  console.log(John.getFullName()); //*this* lúc này vẫn trỏ vào obj John. return -> John Doe

  var Jane = {
    firstName: "Jane"
  }
  Jane.__proto__ = person;
  console.log(Jane.getFullName()); //Jane Default

  ```

### Everything is an Object (or a primitive)
> Functions, Array, Numbers.... are basic object. They all have prototype

```javascript
  var a = {};
  var b = function() {};
  var c = [];

  //in console, try to type a.__proto__. hoac b.__proto__., hoac c.__proto__. to see some default function of this object
  // function la call, bind, apply
  // array la push...
```

### Reflection and Extend
> an useful way to create object
> Reflection is an object can look at itself, listing and changing this properties and methods. Use this feature to apply as Extend

```javascript
// An example of reflection
  var person = {
    firstName: 'default',
    lastName: 'default',
    getFullName: function() {
      return this.firstName + " " + this.lastName;
    }
  };

  var john = {
    firstName: "John",
    lastName: "Doe"So11
  }

  //just for demo purpose, don't do it ever!
  john.__proto__ = person;
  for (var prop in john) { //for in sẽ lấy tất cả các prop của john, bao gồm cả từ john prototype
    if (john.hasOwnProperty(prop)) { //hasOwnProperty() chỉ lấy những prop của john, không bao gồm của john prototype
      console.log(prop + ": " + john[prop]);
    }
  }


```
