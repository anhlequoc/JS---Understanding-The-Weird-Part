var c = {
  name: 'c object',
  log: function () {
    console.log(this);
  }
}
var setName = function (newName) {
  this.name = newName;
};
setName.call(c, 'new name for object');
c.log();
