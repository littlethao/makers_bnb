var Browser = require("zombie");

var browser = new Browser();

var signup = function(callback) {
  browser.visit('http://localhost:3000/users/new', function(err){
    browser.fill('#email-address', 'rosie@allott.com');
    browser.fill('#password', 'password');
    browser.pressButton('#signup', function(){
      callback();
    });
  });
};

exports.signup_func = signup;
