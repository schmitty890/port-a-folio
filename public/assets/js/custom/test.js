// var Test = function(){
//   console.log('test');

//   function getSum(x, y) {
//     return x + y;
//   };

//   function init() {
//     getSum(1, 1);
//   };

//   return {
//     init: init
//   }

// }();

// Test.init();

// module.exports = {
//   sayHello: function() {
//     return 'hello1';
//   },
//   addNumbers: function(x, y) {
//     return x + y;
//   }
// }

var Calculator = function(){

  var add = function(x, y) {
    return x + y;
  };

  function init() {
    // getSum(1, 1);
  };

  return {
    init: init,
    add: add
  }

}();

// Test.init();


module.exports = {
  calculator: Calculator
}
// module.exports = {
//   getSum: function(x, y) {
//     return x + y;
//   }
// }

