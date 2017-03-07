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
  var english = {
    greetings: {
      basic: "hello!"
    }
  };
  var spanish = {};
  console.log(english.greetings.greet);//no error
