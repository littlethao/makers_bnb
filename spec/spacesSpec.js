var Browser = require("zombie");

describe("Visiting /spaces", function(){

  var browser = new Browser();

  it("should be successful", function(next){
    browser.visit('http://localhost:8000/spaces', function(err){
    expect(browser.success).toBe(true);
    next();
    });
  });

  it("should give us a form to place a space", function(next){
    browser.visit('http://localhost:8000/spaces', function(err){
      browser.fill('input[name ="title"]', "Cosy home with seaview");
      browser.fill('input[name="description"]', "Double bedroom with balcony");
      browser.fill('input[name="price"]', "40 per night");
      browser.pressButton('input[value="Add space"]', function(){
        expect(browser.success).toBe(true);
        expect(browser.html("body")).toContain("Cosy home with seaview - Double bedroom with balcony - 40 per night");
        next();
      });
    });
  });
});
