function getIndexToIns(arr, num) {
  // Find my place in this sorted array.

  //sort arr by numbers ascending
  arr.sort(function(a, b) {
    return a - b;
  });
  var flag = [];
  arr.map(item => {
    if (item >= arguments[1]) {
      flag.push(arr.indexOf(item));
    }
  });
  // console.log(flag);
  // console.log(arr.length);
  if (flag.length === 0) {
    return arr.length;
  }
  return flag[0];
}

getIndexToIns([10, 20, 30, 40, 50], 35);
getIndexToIns([2, 5, 10], 15);
