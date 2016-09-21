process.env.NODE_ENV = 'test';

var server = require('../index.js');
var url = "http://localhost:3000";
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex.js');
var Browser = require("zombie");

describe('Login testing', function(){

  beforeEach(function(){
    server.listen(3000);
    knexCleaner.clean(knex);
  });

  var browser = new Browser();

  describe("users/login", function(){
    it("should have defined headless browser", function(next){
      browser.visit('http://localhost:3000/users/new', function(err){
        browser.fill('#email-address', 'rosie@allott.com');
        browser.fill('#password', 'password');
        browser.pressButton('#signup', function(err){
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
