const {
  head,
  } = require('./src/library.js');
const fs = require('fs');

const main = function(input) {
  
   console.log(head(input,fs));
}
main(process.argv.slice(2));
