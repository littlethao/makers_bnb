var fizzBuzz = require('../fizzBuzz');

describe('FizzBuzz', function(){

  it('should return fizz if the number % 3 == 0', function(){
    expect(fizzBuzz(3)).toBe('fizz');
  });
  it ('should return buzz if the number % 5 == 0', function (){
    expect(fizzBuzz(5)).toBe('buzz');
  });
  it ('should return 2 for 2', function () {
    expect(fizzBuzz(2)).toEqual(2);
  });
});
