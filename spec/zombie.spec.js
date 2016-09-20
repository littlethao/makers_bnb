var Browser = require("zombie");
var url = "http://google.com";
var browser = new Browser();

describe("testing with zombie", function() {
  it("should have defined a headless browser", function(next){
    expect(typeof browser != "undefined").toBe(true);
    expect(browser instanceof Browser).toBe(true);
    next();
  });
});
