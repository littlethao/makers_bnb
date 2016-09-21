process.env.NODE_ENV = 'test';

var server = require('../index.js');
var url = "http://localhost:3000";
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex.js');
var Browser = require("zombie");

describe('Log out testing', function(){

  beforeEach(function(){
    server.listen(3000);
    knexCleaner.clean(knex);
  });

  var browser = new Browser();

  describe("Log out button", function(){
    it("should be able to log out user", function(next){
      browser.visit('http://localhost:3000/users/new', function(err){
        browser.fill('#email-address', 'rosie@allott.com');
        browser.fill('#password', 'password');
        browser.pressButton('#signup', function(err){
            browser.clickLink('Log out', function(){
              expect(browser.html("body")).toContain("See you again soon");
              next();
            });
          });
        });
      });
    });
  });
