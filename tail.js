const { tail } = require("./src/library.js");
const fs = require("fs");

const main = function(input) {
  console.log(tail(input, fs));
};
main(process.argv.slice(2));
