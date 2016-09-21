process.env.NODE_ENV = 'test';

var server = require('../index.js');
var url = "http://localhost:3000";
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex.js');
var Browser = require("zombie");

describe('Login testing', function(){

  var browser = new Browser();

  beforeEach(function(){
    server.listen(3000);
    knexCleaner.clean(knex);
    browser.deleteCookies();
  });

  afterEach(function(){
    server.close();
  });

  describe("users/login", function(){
    it("should be able to log in", function(next){
      browser.visit('http://localhost:3000/users/new', function(err){
        browser.fill('#email-address', 'rosie@allott.com');
        browser.fill('#password', 'password');
        browser.pressButton('#signup', function(err){
          browser.clickLink('Log out', function(){
          browser.visit(url + '/users/login', function(err){
            browser.fill('#email-address', 'rosie@allott.com');
            browser.fill('#password', 'password');
            browser.pressButton('#login', function(){
              expect(browser.html("body")).toContain("Successfuly logged in");
              next();
              });
            });
          });
        });
      });
    });
  });

  describe("users/login", function(){
    it("should not be able to log in, raise error pword", function(next){
      browser.visit('http://localhost:3000/users/new', function(err){
        browser.fill('#email-address', 'rosie@allott.com');
        browser.fill('#password', 'password');
        browser.pressButton('#signup', function(err){
          browser.clickLink('Log out', function(){
          browser.visit(url + '/users/login', function(err){
            browser.fill('#email-address', 'rosie@allott.com');
            browser.fill('#password', 'incorrect');
            browser.pressButton('#login', function(){
              expect(browser.html("body")).toContain("Incorrect email or password");
              next();
              });
            });
          });
        });
      });
    });
  });

  describe("users/login", function(){
    it("should not be able to log in, raise error email", function(next){
      browser.visit('http://localhost:3000/users/new', function(err){
        browser.fill('#email-address', 'rosie@allott.com');
        browser.fill('#password', 'password');
        browser.pressButton('#signup', function(err){
          browser.clickLink('Log out', function(){
          browser.visit(url + '/users/login', function(err){
            browser.fill('#email-address', 'rosie@notallot.com');
            browser.fill('#password', 'incorrect');
            browser.pressButton('#login', function(){
              expect(browser.html("body")).toContain("Incorrect email or password");
              next();
              });
            });
          });
        });
      });
    });
  });

});
