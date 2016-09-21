process.env.NODE_ENV ='test';
var Browser = require("zombie");
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex');
var server = require('../index.js');
var helpers = require('./helpers/user_signup_helper.js');

describe("Listing space", function(){

  beforeEach(function(){
    knexCleaner.clean(knex);
    server.listen(3000);
  });

  var browser = new Browser();
  browser.debug = true;

  it("should give us a form to place a space", function(next){
    browser.visit('http://localhost:3000/users/new', function(err){
      browser.fill('#email-address', 'rosie@allott.com');
      browser.fill('#password', 'password');
      browser.pressButton('#signup', function(){
      browser.visit('http://localhost:3000/spaces/new', function(err){
        browser.fill('input[name ="title"]', "Cosy home with seaview");
        browser.fill('input[name="description"]', "Double bedroom with balcony");
        browser.fill('input[name="price"]', 40);
        browser.pressButton('input[value="Add space"]', function(){
          expect(browser.success).toBe(true);
          expect(browser.html("body")).toContain("Cosy home with seaview - Double bedroom with balcony - 40 - rosie@allott.com");
          next();
        });
      });
    });
  });
})

it("should give us a form to place a space", function(next){
  browser.visit('http://localhost:3000/users/new', function(err){
    browser.fill('#email-address', 'rosie@allott.com');
    browser.fill('#password', 'password');
    browser.pressButton('#signup', function(){
    browser.visit('http://localhost:3000/spaces/new', function(err){
      browser.fill('input[name ="title"]', "Cosy home with seaview");
      browser.fill('input[name="description"]', "Double bedroom with balcony");
      browser.fill('input[name="price"]', 40);
      browser.pressButton('input[value="Add space"]', function(){
        browser.visit('http://localhost:3000/spaces', function(err){
          expect(browser.html("body")).toContain("Cosy home with seaview - Double bedroom with balcony - 40 - rosie@allott.com");
          next();
        });
      });
    });
  });
});
});
});
