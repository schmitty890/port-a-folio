const assert = require('chai').assert;
const calculatorFunctions = require('../public/assets/js/custom/calculator');

calcAdd = calculatorFunctions.calculator.add(1, 1);
calcSub = calculatorFunctions.calculator.subtract(6, 1);
calcMult = calculatorFunctions.calculator.multiply(5, 2);
calcDiv = calculatorFunctions.calculator.divide(10, 2);
describe('Calculator', function() {
  describe('Calculator.add() it should get the sum', function() {
    it('add() should return 2', function() {
      assert.equal(calcAdd, 2);
    });
    it('add() should return a type number', function() {
      assert.typeOf(calcAdd, 'number');
    });
  });

  describe('Calculator.subtract() it should get the difference', function() {
    it('subtract() should return 5', function() {
      assert.equal(calcSub, 5);
    });
    it('subtract() should return a type number', function() {
      assert.typeOf(calcSub, 'number');
    });
  });

  describe('Calculator.multiply() it should get the product', function() {
    it('multiply() should return 10', function() {
      assert.equal(calcMult, 10);
    });
    it('multiply() should return a type number', function() {
      assert.typeOf(calcMult, 'number');
    });
  });

  describe('Calculator.divide() it should get the divided number', function() {
    it('divide() should return 5', function() {
      assert.equal(calcDiv, 5);
    });
    it('divide() should return a type number', function() {
      assert.typeOf(calcDiv, 'number');
    });
  });
});
