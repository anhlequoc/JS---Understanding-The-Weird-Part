var a;
if (a){ // a = false vì chưa set giá trị; tương tự với a = undefined; a = null; a = ""; a = 0 - chú ý trường hơp a = 0 vẫn false
  console.log('something...');
}

// với a = 0;
a = 0;
if (a || a === 0) {
  console.log('some thing here...');
}

/*
  để check existence của 1 variable, có thể dùng if(a)
*/
