process.env.NODE_ENV ='test';
var Browser = require("zombie");
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex');
var server = require('../index.js');
var bookshelf = require('bookshelf')(knex);

describe("Listing space", function(){

  beforeEach(function(){
    knexCleaner.clean(knex);
    server.listen(3000);
    var Space = bookshelf.Model.extend({tableName: 'spaces'});
  });

  var browser = new Browser();

  it("should have status code of 200", function(next){
    browser.visit('http://localhost:3000/spaces/new', function(err){
      expect(browser.statusCode).toEqual(200);
      expect(browser.html('body')).toContain('Add space');
      expect(browser.query('input[name ="title"]')).toBeDefined();
      expect(browser.query('input[name ="description"]')).toBeDefined();
      expect(browser.query('input[name ="price"]')).toBeDefined();
      expect(browser.query('input[name ="date"]')).toBeDefined();
      next();
    });
  });


  it("should display all spaces on /spaces path", function(next){
    browser.visit('http://localhost:3000/spaces/new', function(err){
      browser.fill('input[name ="title"]', "Cosy home with seaview");
      browser.fill('input[name="description"]', "Double bedroom with balcony");
      browser.fill('input[name="price"]', 40);
      browser.fill('input[name="date"]', "21/09/2016");
      browser.pressButton('input[value="Add space"]', function(){
        browser.visit('http://localhost:3000/spaces', function(err){
          expect(browser.html("body")).toContain("Cosy home with seaview - Double bedroom with balcony - 40 - Wed Sep 21 2016");
          next();
        });
      });
    });
  });

  it("should allow logged in user to request a space", function(next){
    browser.visit('http://localhost:3000/spaces/new', function(err){
      browser.fill('input[name ="title"]', "Cosy home with seaview");
      browser.fill('input[name="description"]', "Double bedroom with balcony");
      browser.fill('input[name="price"]', 40);
      browser.fill('input[name="date"]', "21/09/2016");
      browser.pressButton('input[value="Add space"]', function(){
        browser.visit('http://localhost:3000/spaces', function(err){
          browser.pressButton('input[value="Request Space"]', function(){
            expect(browser.statusCode).toEqual(200);
            expect(browser.html("body")).toContain("Request for 'Cosy home with seaview' was sent");
          });
        });
      });
    });
  });
});
