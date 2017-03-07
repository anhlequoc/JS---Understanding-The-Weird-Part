console.log(1 < 2 < 3);
console.log( 3< 2 < 1);
/*
  3 < 2 -> false: phép so sánh (trái -> phải) là :false < 1
  > js cố gắng convert false sang number để so sánh với 1, dùng hàm Number(false)
  > và Number(false) = 0; Number(true) = 1;
  > 0 < 1 trả về true
*/
