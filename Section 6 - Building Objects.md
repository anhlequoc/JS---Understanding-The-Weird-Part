### Function Constructors, 'new', History of JS
  ```javascript
    function Person() {
      this.firstName: "John",
      this.lastName: "Doe"
    }

    var john = new Person(); //tạo một object mới, keyword "new" là 1 operator, trỏ this vào object mới tạo này
    console.log(john);
  ```
  ```javascript
    function Person(firstName, lastName) {
      this.firstName = firstName,
      this.lastName = lastName
    }

    var john = new Person("John", "Doe"); //tạo một object mới, keyword "new" là 1 operator, trỏ this vào object mới tạo này
    console.log(john);
  ```
> I'm constructing object by using function -> the used function is called as Function Constructor
> Function Constructor: a normal function that is used to construct object. The "this" variable points a new empty object, and that object is returned from the function automatically when the function finishes execution

### 58. Function Constructor and ".prototype"
- when you use the function contructor, it already sets the prototype for you
- remember that function is a special type of object, every functions have the following properties:
  + Name (optional), can be anonymous
  + Code: is the property that stores code, will be execute when invoking function
  + prototype (all functions always have it): it's used only by the "new" operator. It lives only for when you're using a function as a function constructor. For when you're using a function specifically to build objects in this special way, the "prototype" property is used.
    + the "prototype" property on a function is not the prototype of the function, it's the prototype of any object if you're using function as function constructor

  ```javascript
    function Person(firstName, lastName) {
      this.firstName = firstName,
      this.lastName = lastName
    }

    Person.prototype.getFullName = function() {
      return this.firstName + " " + this.lastName;
    }
    var john = new Person("John", "Doe"); //when use the "new" keyword, it creates an empty object and it **sets the prototype of that empty object to the prototype property of the function that you then call**
    console.log(john);

    //có thể add later sau khi tạo object
    Person.prototype.getFormalFullName = function () {
      return '...';
    }
    console.log(john.getFormalFullName());
  ```
> when use the "new" keyword, it creates an empty object and it **sets the prototype of that empty object to the prototype property of the function that you then call**

- có thể add prototype sau khi tạo object nhưng chú ý là function cũng là object, nên nó sẽ tống memory space
  ```
  ở ví dụ, getFormalFullName là property được add vào mọi object nên sẽ tốn bộ nhớ. Nhưng do được add vào prototype dùng chung, nên dù có 1000 object, vẫn chỉ có 1 property
  ```

- **it's better to add method into prototype because it only gets 1 copy when being used**. WHen the object calls the method, the JS engine will go down prototype chain to find it

  ```javascript
  function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  var john = new Person("John", "Doe");
  console.log(john);
  Person.prototype.getFullName = function() {
    return this.firstName + " " + this.lastName;
  };

  for (var index in john) {
    if (john.hasOwnProperty(index)){
      console.log(index + ": " + john[index]); //chỉ có firstName và lastName, do getFullName() nằm ở prototype của john
    }
  }

  ```

### Dangerous Aside: "new" and functions
> Recommend: if you're dealing with function constructor, the name of function constructor should starts with a capital letter

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var john = Person("John", "Doe");//giả sử forgot "new" -> JS engine invoke function Person() như bình thường
//vì Person không return gì cả, tức là return undefined -> john là undefined -> không thể gọi john.getFullName()...
// -> do đó viết hoa chữ đầu để nhắc rằng đó là constructor, dùng nó với chữ "new" chứ ko dùng một mình
```

### Concept: Built-in function constructors
- add thêm feature
  ```javascript
    String.prototype.isLengthGreaterThan = function(limit) {
      return this.length > limit;
    }

    console.log("john".isLengthGreaterThan(3)); //true
  ```
  ```javascript
    var a = new Number(3);
    //khac voi
    var a = 3;
    //vi a = new Number(3) là 1 object, a = 3 là một primitive type, object sẽ có nhiều feature hơn primitive, không nên dùng built-in function constructor cho primitive types, ngay cả khi nó cung cấp thêm các feature (xem bài tiếp)
  ```
### Dangerous Aside: function constructor for primitive type (boolean, number, string...) is also dangerous
  ```javascript
    var a = 3;
    var b = new Number(3);

    a == b; //true
    a === b; //false
  ```
> dùng function constructor không phải là build primitive value, mà recommend là dùng cách literals để build

### Dangerous Aside: Arrays and for...in
- arrays are objects
  ```javascript
    //từ framework khác, add thêm feature cho array
    Array.prototype.myCustomFeature = "cool!";

    var arr = ["John", "Jane", "Jim"];
    //use for... in (không khuyên dùng)
    for (var prop in arr) {
      console.log(prop + ": " + arr[prop]);
    }
    //return: 0: John; 1: Jane; 2: Jim; myCustomFeature: cool! -> myCustomFeature sẽ làm user bị confused

    //recommend:
    for (var i = 0; i < arr.length; i++) {
      console.log (i + ": " + arr[i]);
    }
  ```
- thực tế không dùng for...in cho array

### Object.create and Pure Prototypal Inheritance
  ```javascript
    var person = {
      firstName: "default",
      lastName: "default",
      greet: function() {
        return "Hi " + this.firstName;
      }
    }

    var john = Object.create(person);
    console.log(john); //return empty object, but has its prototype pointing at whatever you passed into Object.create
    //kiem tra
    for (var prop in john) {
      if (john.hasOwnProperty(prop)){
        console.log(prop + ": " + john[prop]); //return nothing
      }
    }

    john.firstName = "John";
    john.lastName = "Doe";
    john.greet(); //return Hi John
  ```
> đây là pur prototypal Inheritance

- Polyfill: is code that adds a feature which the engine may lack
  ```javascript
    //trường hợp browser cũ không hỗ trợ Object.create()

  ```

### ES6 and Classes
```javascript
  class Person {
    constructor (fisrtName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    greet() {
      return "Hi " + firstName;
    }    
  }
  // chú ý là Person vẫn là 1 object
```
> Syntactic sugar: a diferent way to type something that doesn't change how it actually works under the hood

```javascript
  class InformalPerson extends Person {
    constructor (firstName, lastName) {
      super(firstName, lastName);
    }

    greet() {
      return "Yo " + firstName;
    }
  }

```
