const { format_date, format_plural, format_url } = require("../utils/helpers");

// testing to make a more readale date format
test("format_date() returns a date string", () => {
  const date = new Date("2020-03-20 16:12:03");

  expect(format_date(date)).toBe("3/20/2020");
});

// test for plurals if necessary
test("format_plural() correctly pluralizes words", () => {
  const plural = format_plural("Tiger", 2);

  expect(plural).toBe("Tigers");
});

//test for long string URLS
test("format_url() returns simplified string", () => {
  const url1 = format_url("http://test.com/page/1");
  const url2 = format_url("https://www.coolstuff.com/abcdefg/");
  const url3 = format_url("https://www.google.com?q=hello");

  expect(url1).toBe("test.com");
  expect(url2).toBe("coolstuff.com");
  expect(url3).toBe("google.com");
});
