process.env.NODE_ENV = 'test';

var Browser = require("zombie");
var url = "http://localhost:8000";
var browser = new Browser();
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex.js');

describe('user testing', function(){

  beforeEach(function(){
    knexCleaner.clean(knex);
  });

  describe("users/new", function(){
    it("should have defined headless browser", function(next){
      expect(typeof browser != 'undefined').toBe(true);
      expect(browser instanceof Browser).toBe(true);
      next();
    });
  });


  describe("users/new", function(){

    it("should have status code of 200", function(next){
      browser.visit(url + '/users/new', function(err){
        expect(browser.statusCode).toEqual(200);
        expect(browser.html('body')).toContain('Signup');
        expect(browser.query('#email-address')).toBeDefined();
        expect(browser.query('#password')).toBeDefined();
        expect(browser.query('#signup')).toBeDefined();
        next();
      });
    });
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
