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
  ```

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

### Faking Namespace
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
> reminder: when a function is invoked, a new execution context is created

Note: **"this" keyword is pointing to different object depending on how function is invoked -> cause a lot of confusions**

See some examples below:

```javascript
  function a() {
    console.log(this);
  }
  a(); //show window object (global obj)
  var b = function() {
    console.log(this);
  }
  b(); //show window object
```

```javascript
  var c = {
    name: "the c object", //key has value as primitive type -> key is called as property, if value of key is a function, key is called as method
    log: function() {
      this.name = "update the c obj"; //can mutate (change) the obj that contains function if function is a method of obj
      console.log(this);
    }
  }
  c.log(); //return the c object
```

```javascript
  var c = {
    name: 'the c object',
    log: function() {
      this.name = 'update c obj';
      console.log(this); //return the c obj with c.name is "update c obj"
      var setName = function(newName) {
        this.name = newName; //this ở đây sẽ trỏ về global obj (window obj), do đó, window obj sẽ có thêm property name và window.name  = "updated again! the c obj";
      }
      setName('updated again! the c obj');
      console.log(this); // return the c obj with c.name still is "update c obj",
    }
  }
```
**Ví dụ trên xảy ra rất nhiều trên thực tế.**

Để fix trường hợp this trỏ về window obj (globa obj), thường có cách này:

```javascript
  var c = {
    name: 'the c obj',
    log: function() {
      var self = this; //hoặc var that = this; Vì obj là By Reference nên self sẽ trỏ đến cùng ô nhớ với this trên memory, từ đó thay đổi attribute của self sẽ thay đổi attribute của this (this đang trỏ vào obj c)
      self.name = "update c obj";
      console.log(self);
      var setName = function(newName) {
        self.name = newName;
      }
      setName('updated again! the c obj');
      console.log(this); //return the c obj with the c.name is changed to "updated again! the c obj"
    }
  }
```

### Array - collections of anything
> an array is a collection that holds many things inside of it

```javascript
  var arr = [
    1,
    false,
    {
      name: "anh",
      address: "fake addres"
    },
    function(name) { //another array's element, which is a function
      var greeting = "hello";
      console.log(greeting + name);
    },
    "hello" // a string element in array
 ]; //using literal array syntax
 console.log(arr);
 arr[3](arr[2].name); //in order to invoke the function: () is invoking function
```

### arguments AND SPREAD
> arguments is a keyword that is set automatically by JS when calling a function. arguments contains all the values that are passed to function
> Arguments are the parameters you pass to a functions, has special keyword named "arguments"

```javascript
  function greet(firstname, lastname, language) {
    console.log(firstname);    
    console.log(lastname);
    console.log(language);    
    console.log(arguments); //return "array" of params
  }
  greet();//nếu call greet() mà ko truyền vào parameters nào, -> trả về undefined hết vì khi khai báo function, JS engine sẽ setup bộ nhớ cho 3 tham số trên, và gán giá trị là undefined (giống như var xxx; console.log(xxx) -> kết quả là undefined)
```

- arguments gần như 1 array chứa các param nhưng không có đủ các feature như 1 JS array

Spread:

```javascript
  function greet(firstname, lastname, ...other) {
    console.log(firstname);
    console.log(lastname);
  }
  greet("anh", "le", 23, "he he", false); //other sẽ chứa 23, "he he", false, gọi là spread

```

###Framework aside - function overloading

```javascript
  function greet(fistname, lastname, language) {
    language = language || "en"; //set default value cho language la "en" trong truong hop khong truyen gia tri cho language

    if (language === 'en') {
      console.log('Hello ' + firstname + ' ' + lastname);
    }

    if (language === 'es') {
      console.log('Hola ' + firstname + ' ' + lastname);
    }
  }

  greet('John', 'Doe', 'en'); // return Hello...
  greet('John', 'Doe', 'es'); // return Hola...

  //hoặc dùng pattern khác để dùng function overloading
  function greetEnglish (firstname, lastname) {
    greet(firstname, lastname, 'en');
  }

  function greetSpanish (firstname, lastname) {
    greet(firstname, lastname, 'es');
  }
  greetEnglish('John', 'Doe');
  greetSpanish('John', 'Doe');
```

### Conceptual Aside - Syntax Parser
> Syntax parser reads code written by developer and convert it to computer's language

### Dangerous Aside
> Dangerous Aside is so easy to make a mistake, and it's hard to track down, so you have to always avoid it while writing code

- The JS Engine can put the semicolon automatically -> can cause a big problem in
> should always put your own semicolon

```javascript
  //ví dụ khi không đặt semicolon
  function getPerson() {
    return // không đặt dấu ';' ở đây
    {
      firstname: 'Tony'
    }
  }
  console.log(getPerson()); //expect là obj trên nhưng thực tế bị undefined, vì JS engine tự động đặt dấu ';' vào ngay sau return (trước khi xuống dòng)
```

### Framework aside - white space
> whitespace: are invisible characters that create literal 'space' in your written code such as returns (enters) , tabs, spaces

### Immediately Invoked Function Expressions (IIFE)

```javascript
  //function statement
  function greet(name) {
    console.log(name);
  }
  greet("he");

  //using function expression
  var greetFunc = function(name) { //create function on the fly - có thể coi như using function literal
    //giống như tạo object, có property là code -> invoke property on the fly
    console.log(name);
  };
  greetFunc("he");

  //using an Immediately Invoked Function Expression (IIFE)
  var greeting = function(name) {
    console.log(name);
  }('John'); //đặt () để invoke function ngay lập tức sau khi create nó

  //
  var greeting2 = function(name) {
    return "hello " + name;
  }('John');
  console.log(greeting2); //greeting lúc này là string, nếu cố gắng invoke nó: greeting2() > error: string is not a function
```

- **Pattern của IIFE xuất hiện trong nhiều major lib/framework của js**

```javascript
  //IIFE
  var firstname = "anh";
  (function(name) { //đặt dấu ngoặc ở trước và sau fucntion để trick JS parser, coi như đây ko phải function
    console.log("using IIFE " + name);
  }(firstname)); //dấu ngoặc bao cả hàm để gọi ngay hàm này - executing code on the fly

  //cause error
  function(name) { //error: Uncaught SyntaxError: Unexpected token (
    console.log(name);
  }();
```

### Framework Aside: IIFEs and Safe Code

```javascript
  var greeting = "hello";
  //IIFE
  (function(name) {
    var greeting = "hola"; // biến greeting chỉ nằm trong execution phase của hàm này, không ảnh hưởng đến global obj ở ngoài
    console.log(greeting + " " + name);
  }('Anh'));
  console.log(greeting); //hello
```

- Viết như trên thì sẽ có *Safe Code* vì biến nằm riêng biệt trong scope khác nhau
> các lib, framework rất hay bao đầu tiên và kết thúc là (function(){}) để tạo scope cho biến

```javascript
  //access to global object
  var greeting = "hello";
  (function(global, name) {
    var greeting = "hola";
    global.greeting = "xin chao!";

  }(window, "anh")); //window ở đây là global obj của JS, thực tế có thể truyền vào bất kỳ thằng obj nào

  console.log(greeting); //result là "xin chao!"
```

### Understanding Closures

```javascript
  function greet(whattosay) {
    return function(name) {
      console.log(whattosay + ' ' + name);
    }
  }
  var sayHi = greet('Hi'); //(A)
  sayHi('Anh'); //(B)
```

- khi chạy đến line (A), JS engine sẽ đưa hàm greet vào trong execution stack, trả về 1 function, xong sẽ remove hàm greet() ra khỏi execution stack này.
- **tuy nhiên biến whattosay vẫn tồn tại trong memory** (chưa được xóa)
- chạy đến line (B), sayHi sẽ chạy đến dòng *console.log...* và thấy biến *whattosay*
- Do không tìm thấy biến *whattosay* ở trong hàm của sayHi, JS Engine sẽ tìm ra ngoài scope của hàm sayHi này, lúc này sẽ thấy biến **whattosay tồn tại bên ngoài** , ở *outer of execution context* của hàm và sử dụng biến đó
-> we say:
> The execution context has closed in its outer variables, the variables that it would normally have reference to anyway. Even though those execution contexts are gone
> And so this phenomenon, of it closing in all variables that it's supposed to have access to, is called a CLOSURE

- example:

    ```javascript
      function buildFunctions() {
        var arr = [];
        for(var i = 0; i < 3; i++) {
          arr.push(
            function() {
              console.log(i);
            }
          );
        }
        return arr;
      }

      var fs = buildFunctions();
      //call elements of arr
      fs[0](); //3
      fs[1](); //3
      fs[2](); //3
      //Khi mới add function vào array ở vòng for, nó chưa call ngay dòng console.log, vì chưa có câu lệnh invoke các element của array, chỉ là add function vào array thôi
      // the console.log() is executed when it's invoked only, not execute when it's writing in code
      // i còn được gọi là free variable - outside of function but you have access to
    ```

  + để gọi được 0, 1, 2 ở i

    ```javascript
      //ES 5
      function buildFunction2() {
        var arr = [];
        for (var i = 0; i < 3; i++) {
          arr.push(
            (function(j) {
              console.log(j); //- có dòng này sẽ chạy ngay khi push vào arr do hàm được invoke ngay khi tạo
              return function(){
                console.log(j);
              }
            }(i)) //immediate invoke function: push f1 -> execute f1 -> push f2 -> execute f2 -> push f3 -> execute f3
          )
        }
        console.log(arr);
        return arr;
      }
      var fs = buildFunction2();
      fs[0](); //0
      fs[1](); //1
      fs[2](); //2
    ```

    hoặc

    ```javascript
      //using ES6
      function buildFunction3() {
        var arr = [];
        for (var i = 0; i < 3; i++) {
          let j = i;
          arr.push(
            function() {
              console.log(j);
            }
          );
        }
        return arr;
      }
      var fs = buildFunction3();
      fs[0](); //0
      fs[1](); //1
      fs[2](); //2
    ```

### Framework Aside: Function Factories (use Closesure)

  ```javascript
    //function overloading by using closure
    function makeGreeting(language) { //factory function - the function that returns or makes other things

      return function (firstname, lastname) { // language will be collected in the closure
        if (language === 'en') {
          console.log('Hello ' + firstname + ' ' + lastname);
        }

        if (language === 'es') {
          console.log('Hola ' + firstname + ' ' + lastname);
        }
      }
    }

    var greetEnglish = makeGreeting('en'); // create 1 execution context
    var greetSpanish = makeGreeting('es'); // create another execution context (khác với trên) của cùng function - khi call lần thứ 2, thì có new execution context - đồng nghĩa với có lưu ở chỗ khác trong memory so với previous execution context

    greetEnglish('anh', 'le'); //hello anh le
    greetSpanish('anh', 'le'); //hola anh le

    //makeGreeting() has acted as Factory function
  ```

  > Everytime you call a function, you get a new execution context - meaning new memory space to store function (each function has its own execution context)
  > khi invoke greetEnglish('anh', 'le'), nó point đến 1st execution context, chứa language là 'en'
  > khi invoke greetSpanish('anh', 'le'), nó point đến 2nd execution context, chứa language là 'es'
<<<<<<< HEAD
=======

### Closures and Callbacks
  ```javascript
    function sayHiLater() {
      var greeting = 'Hi!';
      setTimeout(function() {
        console.log(greeting); //using closure
      }, 3000);
    }
    sayHiLater();

    //same thing on jQuery
    // jQuery uses function expressions and first-class functions!
    $("button").click(function() { //click trong jQuery là 1 function, truyền vào 1 function object

    });
  ```
- function trong setTimeout do something sau khi setTimeout chạy xong.
- callback:
> giving function to another function, having it execute when it's done, is called a callback

-> **callback function: a function you give to another function, to be run when the other function is finished**

  ```javascript
    function tellMeWhenDone(callback) {
      var a = 1000; //some work
      var b = 2000; //some work
      callback(); //the 'callback', it runs the function I give it!
    }

    tellMeWhenDone(function() {
      console.log('I m done!');
    })

    tellMeWhenDone(function() {
      console.log('all done...!');
    })
  ```

### call(), apply(), and bind()
> dùng để control **this** trỏ vào đâu

Function là object, với những thuộc tính sau:
- name (optional): can be anonymous
- có thuộc tính invocable () : access vào code
- **có access vào những special method** như call(), apply(), bind(). Những special methods này phải sử dụng với **this** variable

  ```javascript
    var person = {
      firstname: 'John',
      lastname: 'Doe',
      getFullName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
      }
    }

    var logName = function(lang1, lang2) {
      console.log('Logged: ' + this.getFullName()); //return error vì this đang ở global object
      console.log('Arguments: ' + lang1 + ' '+ lang2);
      console.log('-------');
    }

    var logPersonName = logName.bind(person);
    logPersonName('en');//return Logged John Doe
    /*có thể viết
      var logName = function(lang1, lang2) {
      console.log('Logged: ' + this.getFullName());      
      }.bind(person);
      logName();
    */

    logName.call(person, 'en', 'es'); //first param is where this points to, next are params
    logName.apply(person, ['en', 'es']); //do exact same thing with call(), except it needs an array of params
  ```

> .bind() creates a copy of whatever function you're calling it on and then whatever methods you pass to it, whatever object you pass to this method, the person object pass to bind. The person obj is what the this variable points to, by reference

  ```javascript
  //c2: create function on the fly, the invoking it using .apply() because all function objects get access to this method
  (function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName()); //return error vì this đang ở global object
    console.log('Arguments: ' + lang1 + ' '+ lang2);
    console.log('-------');
  }).apply(person, ['en', 'es']);
  ```

- Khi dùng trong thực tế
  ```javascript
  //function borrowing
    var person = {
      firstname: 'John',
      lastname: 'Doe',
      getFullName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
      }
    };
    var person2 = {
      firstname: 'Jane',
      lastname: 'Doe'
    }

    console.log(person.getFullName.apply(person2)); // gọi getFullName function obj của person, nhưng trỏ this đến person2 -> return Jane Doe

  ```

> with .call() and .apply(), passing params just passes the parameters
> with .bind(), you're not calling the original function, you're creating a new copy of it

- **Function currying: creating a copy of a function but with some preset parameters**. It's very useful in mathematical situations
  ```javascript
  //function curring
    function multiply (a, b) {
      return a*b;
    }

    var multiplyByTwo = multiply.bind(this, 2); // 2 là preset của param a
    console.log(multiplyByTwo(3)); //3 được hiểu là b -> return 6

    var multiplyByThree = multiply.bind(this, 3);
    console.log(multiplyByThree(4)); // return 12
  ```

### Functional Programming
  ```javascript
  //beauty of functional programming
    function mapForEach(arr, fn) { //fn is a function
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        newArr.push(
          fn(arr[i])
        );
      }

      return newArr;
    }

    var arr1 = [1,2,3];
    console.log(arr1);

    var arr2 = [];
    var arr2 = mapForEach(arr1, function(item) {
      return item * 2;
    });
    console.log(arr2);

    var arr3 = mapForEach(arr1, function(item) {
      return item > 2;
    });
    console.log(arr3);

    //another example
    var checkPastLimit = function(limiter, item) {
      return item > limiter;
    }
    var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1)); //copy the checkPastLimit original function, preset limiter as 1 because the mapForEach() just pass element of arr1 to function, does not pass limiter
    console.log(arr4);

    //nếu không muốn gọi .bind() mỗi lần call
    var checkPastLimitSimplified = function (limiter) {
      return function(limiter, item) {
        return item > limiter;
      }.bind(this, limiter);
    };
    var arr5 = mapForEach(arr1, checkPastLimitSimplified(2));
    //checkPastLimitSimplified(2) trả về function obj cho mapForEach với limiter là 2
  ```
>>>>>>> 6bdf7e137711251a65081a99afab3dc3c4d36898

> Javscript có ưu điểm lớn này so với các ngôn ngữ khác, cần làm quen với việc viết pass function obj
