process.env.NODE_ENV ='test';
var Browser = require("zombie");
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex');
var server = require('../index.js');
var bookshelf = require('bookshelf')(knex);


describe("Listing space", function(){

  var browser = new Browser();

  beforeEach(function(){
    knexCleaner.clean(knex);
    server.listen(3000);
    browser.deleteCookies();
    var Space = bookshelf.Model.extend({tableName: 'spaces'});
    knex('users').insert({email: 'rosie@allott.com', password: '$2a$10$MjmF1z/VeNe7V5asctIbDOyM8fJeqGeMYFUni7V5Xt80QL5hGCn8G'});
  });

  afterEach(function(){
    server.close();
    knexCleaner.clean(knex);
  });

  browser.debug = true;

  it("should display all spaces on /spaces path", function(next){
    browser.visit('http://localhost:3000/users/new', function(err){
      browser.fill('#email-address', 'rosie@allott.com');
      browser.fill('#password', 'password');
      browser.pressButton('#signup', function(){
        browser.visit('http://localhost:3000/spaces/new', function(err){
          browser.fill('input[name ="title"]', "Cosy home with seaview");
          browser.fill('input[name="description"]', "Double bedroom with balcony");
          browser.fill('input[name="price"]', 40);
          browser.fill('input[name="date"]', "21/09/2016");
          browser.pressButton('input[value="Add space"]', function(){
            browser.visit('http://localhost:3000/spaces', function(err){
              expect(browser.html("body")).toContain("Cosy home with seaview - Double bedroom with balcony - 40 - rosie@allott.com - Wed Sep 21 2016");
              next();
            });
          });
        });
      });
    });
  });

  // it("should allow logged in user to request a space", function(next){
  //   browser.visit('http://localhost:3000/users/new', function(err){
  //     browser.fill('#email-address', 'rosie@allott.com');
  //     browser.fill('#password', 'password');
  //     browser.pressButton('#signup', function(){
  //       browser.visit('http://localhost:3000/spaces/new', function(err){
  //         browser.fill('input[name ="title"]', "Cosy home with seaview");
  //         browser.fill('input[name="description"]', "Double bedroom with balcony");
  //         browser.fill('input[name="price"]', 40);
  //         browser.fill('input[name="date"]', "21/09/2016");
  //         browser.pressButton('input[value="Add space"]', function(){
  //           browser.visit('http://localhost:3000/spaces', function(err){
  //             browser.pressButton('input[value="Request Space"]', function(){
  //               expect(browser.statusCode).toEqual(200);
  //               expect(browser.html("body")).toContain("Request for 'Cosy home with seaview' was sent");
  //               next();
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
});
