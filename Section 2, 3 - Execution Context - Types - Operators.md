### Execution Context
Global Execution context is created in two phases:
  A. Creation Phase (Setup memory phase): will have 2 things
    - Global Object
    - this
    - Outer Environment
    -> setup memory space for variables and functions, goij laf "hoisting" - move code (function created, variables exist in memory) to top so that other line of code can access them. Tuy nhiên có khác một chút với các biến (variables)
      - toàn bộ function (cả code trong function đó) được chuyển vào memory
      - với biến, chỉ khai báo vào memory mà ko thực thi dòng code gán biến cho giá trị
    -> ở phase này, toàn bộ biến đều là undefined

  B. Execution Phase:
    - có 3 thứ trên setup (Global Object, this, Outer environment), phase này run code line by line

### Single Thread & Synchronous
  - Single Thread là trong 1 thời điểm chỉ có 1 lệnh thực thi
  - Synchronous: code chạy đồng bộ từ trên xuống dưới
  -> JS là single thread synchronous execution (sẽ xem async ở dưới)
  - mỗi lần fucntion is called, new execution context is called, line by line, synchronously
  ví dụ
  
    ```javascript
      function a() {
        b(); //(3)
        var c; //(4)
      }
      function b() {
        var d; //(5)
      }
      a(); //(1)
      var d; //(2)
    ```
Thứ tự các dòng code chạy là: (1) -> (3) -> (5) -> (4) -> (2) (do js là single thread và synchronous)

#### let

  ```javascript
    if (a > b) {
      let c = true; // c chỉ access được trong phạm vi {} gần nhất
    }
  ```

### Asynchronous callbacks
> Asynchronous: more than one at a time (JS Engine run code line by line, synchronously)

The browser includes following elements:
  - Rendering Engine
  - Javascript Engine
  - HTTP Request

- JS Engine: bên cạnh Execution Stack (Global Execution Context > Execution context của từng hàm...), thì có 1 cái khác là *Event Queue*. *Event Queue* chứa những event như: Click, hover, HTTP Request (ví dụ khi đang chạy code mà có data trả về browser)
- Khi Execution Stack is empty (chạy xong Execution context của từng hàm, chạy xong Global Execution Context), JS sẽ lắng nghe *Event Queue* xem có event nào xảy ra không để gọi event handler. Khi có event, nó sẽ gọi Execution context của event đó (ví dụ clickHanlder())
> chú ý *Event Queue* chỉ được processed sau khi Execution Context empty
Asynchronous callbacks is possible in Javascript but it's really about something outside JS Engine (tuy nhiên khi Execution Context đang chạy, *Event Queue* vẫn được lưu lại)

### Types
  > Dynamic Typing: you don't tell the engine what type of data a variable holds, it figures it out while your code is running -> variables can hold different types of values because it's all figured out during execution (differnt with Java, C#)

  ```Java
    bool isNew = 'hello'; //an error
  ```
  
  ```javascript
    var isNew = true; //no error
    isNew = 'up!';
    isNew = 1;
  ```
  -> make JS powerful and confused

#### Primitive Types
> Primitive Type is a type of data that represents a single value. That is, not an object (because object is a collection of name-value pairs) - a Primitive Type is just a single value

6 primitive types in JS:
  - undefined: represents lack of existence (best practive: don't set a variable to undefined, because then we will not know the variable is set to undefined by JS Engine, or by ourself)
  - null: also represents lack of existence (we can set variable to null, against of undefined)
  - boolean: just *true* or *false*
  - number: it's floating point number (there's always some decimals)
  - string: it's a sequence of characters
  - symbol: used in ES6, it's being constructed and not fully supported by all browsers

### Operators
> Operators takes two arguments and return one result

- operator presedence: just means which operator function is called first
- associativity (fixity): what order operator functions get called in: left-to-right or right-to-left

#### Operators comparisons
  ```javascript
  console.log( 3< 2 < 1);
  /*
    3 < 2 -> false: phép so sánh (trái -> phải) là :false < 1
    > js cố gắng convert false sang number để so sánh với 1, dùng hàm Number(false)
    > và Number(false) = 0; Number(true) = 1;
    > 0 < 1 trả về true
    > note:
        + Number(undefined) = NaN //not a number
        + Number(null) = 0
  */
  ```

### Existence and Boolean
  ```javascript
    //không khuyến khích dùng hàm Boolean (chỉ dùng khi demo)
      Boolean(undefined) // false
      Boolean(null) // false
      Boolean("") // false
  ```
  - trong js, phép || trả về giá trị mà có thể convert đc thành true (xem vd)
    ```javascript
      true || false //return true
      undefined || "hello" // return "hello"
      null || "hello" // return "hello"
      "" || "hello" // return "hello"
      //vì undefined, null, "" đều bị convert thành false, nên || trả về "hello", giá trị mà được convert sẽ thành true
      //vì thế, có thể dùng nó để khai báo giá trị mặc định của tham số truyền vào như sau
      function greet(name){
        name = name || "<your name here>"; //<your name here> là giá trị default trong trường hợp gọi hàm greet() nhưng ko truyền vào gì, đồng thời || cũng có priority cao hơn = nên sẽ được thực thi trước
        console.log("hello " + name);
      }
      greet('Tony');
      greet();//không truyền vào gì -> log ra screen là: hello <your name here>
      //viết thế này vẫn phải cẩn thận với số 0
      greet(0);//return "hello <your name here>"
    ```

### FRAMEWORK
####Default Values
  - file js 1:
    ```javascript
      var libName = "library 1";
    ```
  - file js 2:
    ```javascript
      var libName = "library 2";
    ```
  - khi trộn 2 file với nhau, nếu file js 1 được xếp trước, -> libName sẽ là "libarary 2"
  - muốn kiểm tra libName có nằm trong global execution object hay không? check như sau:
    ```javascript
      window.libName = window.libName || "library 2";
    ```
