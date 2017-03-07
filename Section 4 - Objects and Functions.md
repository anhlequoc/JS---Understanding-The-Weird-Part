> In Javasript, *OBJECTS and FUNCTIONS are very very much related to each other*. They are in many ways, are the same subject

###OBJECTS and the DOT
  - Object có những properties, object hoặc function được connect với nó, lưu ở memory của máy tính
  ```javascript
  var person = new Object();
  person["firstName"] = "Tony"; //create new attribute of person obj, called "firstName" - save it in memory
  person["lastName"] = "Alicea";
  var firstNameProperty = "firstName";
  console.log(person);//return object
  console.log(person[firstNameProperty]);
  console.log(person.firstName);
  //also, can do this
  person.address = new Object();
  person.address.street = "111 Doi Can";
  person.address.city = "Hanoi";
  person.address.state = "HN";
  // DOT hay bracket ([]) khi access vào attribute của object đều là các operators, nên nó có priority và cách tính từ trái-phải hoặc phải-trái

  //chỉ nên dùng person['address']['street'] (dấu ngoặc vuông) khi cần thao tác với string trong trong ngoặc vuông (some kind of dynamic string - programmatically)

####Object and Object Literals

```javascript
  var person = new Object(); //cách truyền thống
  var person = {}; //cách dùng Object Literals synctax, giống hệt cách trên
  var person = {
    firstname: "Anh",
    lastname: "Le",
    address: {
      street: "233 Doi Can",
      city: "HN",
      state: "HN"
    }
  };
```

###Faking Namespace
> Namespace is a container for variables and functions, typically to keep variables and functions with the name separate (note that js does not have namespace but we can fake it by using Object)

```javascript
  //neu khong dung object
  var greet = "hello";
  var greet = "hola!"; //ở 1 file js khác

  //dung object
  var english = {};
  var spanish = {};

  english.greetings.greet = "Hello";
  spanish.greet = "hola!";

  console.log(english.greet);//error: can not set property "greet" of undefined vì greetings chưa được define
```

```javascript
  //faking namespace
  var english = {
    greetings: {
      basic: "hello!"
    }
  };
  var spanish = {};
  console.log(english.greetings.greet);//no error
```

### Functions are Objects
> First Class Function: in JS, function are objects
> First Class Functions: meaning everything you can do with other types (object, boolean, string, number...), you can do with functions:
  - assign variable that has value as function
  - pass functions around as parameters to other functions
  - create functions on the fly with the kind of literal syntax...

- Since function is object, Function reside a memory, has all feature of normal object, has some special properties, user can add properties and method to functions. Function object has:
  + **Primitive**
  + **Object**
  + **Functions (other)**
  + **Name (optional, can be anonymous)**
  + **CODE: actual line of codes has been written -> code is just a property of function -> function is invocable**
> You have to think about function more than a container of code, it's **an object**, and as such, you can pass it around. It sits in memory, in a specific location, has properties, has methods.

### Functions statements and functions expressions
> An expression is a unit of code that results in a value. it doesn't have to save to a variable

```javascript
  var a;
  if (a === 3) {} // -> if is statement, not expression because it does not return a value
```
```javascript
  //greet() is just function statement, because it does not return value  
  function greet() {
    console.log('hi');
  }

  //use function expression
  var anonymousGreeet = function() { //anonymousGreeet là variable, ở memory được set giấ trị là 1 function object
    console.('hi');
  }// đây là function expression vì nó return result là 1 object (function)

```

- Chú ý
```javascript
  greet();
  function greet() { //hoisted function in preparation phase by JS engine
    console.log('hi');
  }

  anonymousGreeet(); //cause error: Uncaught TypeError: anonymousGreeet is not a function -> phải move xuống dưới dòng khai báo function()
  var anonymousGreeet = function() { // JS engine just hoist var anonymousGreeet, does not hoist function, function is just called in execution phase
    console.log('hi');
  }
```
So:
> function statement are hoisted in preparation phase of JS engine
> function expression are **not** hoisted in preparation phase of JS engine. it's just called in execution phase

```javascript
  function log(a) {
    console.log(a);
  }  
  log(3);
  log({
    greeting: 'hi'
  });
  log(function() { //create function on the fly like creating object above because function is object
    console.log('hi');
  });
```
```javascript
  function log(a){
    //để gọi function anonymous ở dưới, chỉ cần viết thế này
    a(); //invoke function that is passed as 'a' parameter
  }
  log(function() { //cả hàm log là function expression
    console.log('hi');
  })
```
So:
> It's concept of **first class function**: can pass function around, give function to other functions, use them like variables, introduce an entirely new class of programming, called **functional programming**

### By Value vs By Reference
- By Value
```javascript
  //set variable to a primitive value
  var a = 3; // set a = 3, 3 là 1 ô nhớ trong memory

  var b = a; // set b = 1 ô nhớ khác với ô nhớ của a trong memory, cũng có giá trị là 3 hoặc có thể pass a vào 1 function

  //-> gọi là By Value
```
- By Reference
```javascript
  //set variable to an object
  var a = {name: 'anh'};

  var b = a; // set b vào cùng 1 ô nhớ chứa object (không copy object sang 1 ô nhớ khác) với a trong memory hoặc có thể pass a vào 1 function

  //-> By Reference
```
> all objects interact as By Reference

Note:
> Mutate: means change something | Immutable: means it can not be changed -> mutate object: change something of obj (attributes, ...)

Note:
```javascript
  //By Reference
  var c = {greeting: "hi"};
  var d;
  d = c;

  c.greeting = "Hello";
  console.log(c); //Hello
  console.log(d); //Hello

  function changeGreetings(obj){
    obj.greeting = "hola";
  }
  changeGreetings(d);
  console.log(c); //hola
  console.log(d); //hola

  //note: equal operator sets up new memory space (new address)
  c = {greeting: 'howdy'} //set up 1 location mới ở memory cho c
  console.log(c); //howdy
  console.log(d); //hola (ngoại lệ) - vì d vẫn trỏ vào location cũ
```
> all primitive types are by value
> all objects are by reference

### Objects, Functions, and "this"
