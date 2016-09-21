process.env.NODE_ENV = 'test';

var server = require('../index.js');
var url = "http://localhost:3000";
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex.js');
var Browser = require("zombie");

describe('user testing', function(){

  beforeEach(function(){
    server.listen(3000);
    knexCleaner.clean(knex);
  });

  var browser = new Browser();

  describe("users/new", function(){
    it("submitting should create a success message", function(next){
      browser.visit(url + '/users/new', function(err){
        browser.fill('#email-address', 'rosie@allott.com');
        browser.fill('#password', 'password');
        browser.pressButton('#signup', function(){
          expect(browser.statusCode).toEqual(200);
          expect(browser.html('body')).toContain('Welcome rosie@allott.com');
          next();
        });
      });
    });
  });
});
