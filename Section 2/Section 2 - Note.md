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

### 
