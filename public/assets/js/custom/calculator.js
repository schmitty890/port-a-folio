var Calculator = function(){

  var add = function(x, y) {
    return x + y;
  };

  var subtract = function(x, y) {
    return x - y;
  };

  var multiply = function(x, y) {
    return x * y;
  };

  var divide = function(x, y) {
    return x / y;
  };

  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  }

}();


module.exports = {
  calculator: Calculator
}