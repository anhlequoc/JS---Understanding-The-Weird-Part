  var c = {
    name: 'the c object',
    log: function() {
      this.name = 'update c obj';
      console.log(this); //return the c obj with c.name is "update c obj"
      function setName (newName) {       
        this.name2 = newName; //this ở đây sẽ trỏ về global obj (window obj), do đó, window obj sẽ có thêm property name và window.name  = "updated again! the c obj";
        console.log(this);
      }
      setName('updated again! the c obj');
      console.log(this); // return the c obj with c.name still is "update c obj",
    }
  }
  c.log();
  console.log(this.name2);