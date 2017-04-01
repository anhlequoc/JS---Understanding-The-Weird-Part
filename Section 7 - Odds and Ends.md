### Initialization
  ```javascript
    var people = [
      {
        firstname: "john",
        lastname: "doe",
        addresses: [
          '111 Doi Can',
          '266 Kim Ma'
        ]
      },
      {
        firstname: "jane",
        lastname: "doe",
        addresses: [
          '333 Doi Can',
          '222 Kim Ma'
        ],
        greet: function() {
          return "Hello";
        }
      },      
    ]
  ```

### typeof, instanceof, and figuring out what something is... ?
  ```javascript
    var a = 3;
    console.log (typeof a); //return number (not Number with capital "N")

    var b = "hello";
    console.log (typeof b); //return string

    var c = {};
    console.log (typeof c); //return object

    var d = [];
    console.log (typeof d); //return object - weird!
    console.log(Object.prototype.toString.call(d)); //return [Object arra] -> better!

    function Person (name) {
      this.name = name;
    }

    var e = new Person("John");
    console.log(typeof e); //object
    console.log(e instanceof Person); //true

    console.log(typeof undefined); //undefined
    console.log(typeof null); //object -> it's a bug of JS

    var z = function() {};
    console.log(typeof z); //function
```

### STRICT MODE
> use this words when you want to tell JS engine to process your code in a stricter way, to beo more regimented, to be pickier about what it lets you do

  ```javascript
    'use strict';
    var person;
    persom = {};
    console.log(persom); //error: persom is not defined -> user biết mình đã gõ sai chữ person
  ```
- 'use strict' is useful, although you can use it not in all cases
- khi dùng nhiều file js, có 1 file có use trict thì khi merge lại để tải về cho browser, các file khác cũng bị check 'use strict' -> có thể gây ra vẫn đề
- ref link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
