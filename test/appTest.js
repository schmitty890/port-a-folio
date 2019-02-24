const assert = require('chai').assert;
const app = require('../server');
// const sayHello = require('../server').sayHello;
// const addNumbers = require('../server').addNumbers;

// Results
sayHelloResult = app.sayHello();
addNumbersResult = app.addNumbers(5, 5);


describe('App', function() {
  describe('sayHello()', function() {
    it('app should return hello', function() {
      // let result = app.sayHello();
      assert.equal(sayHelloResult, 'hello');
    });

    it('sayHello should return a type string', function() {
      // let result = app.sayHello();
      assert.typeOf(sayHelloResult, 'string');
    });
  });


  describe('addNumbers()', function() {
    it('addNumbers should be above 5', function() {
      // let result = app.addNumbers(5, 5);
      assert.isAbove(addNumbersResult, 5);
    });

    it('addNumbers should return a type number', function() {
      // let result = app.addNumbers(5, 5);
      assert.typeOf(addNumbersResult, 'number');
    });
  });

});