const {classifyParameters,
  extractUsefulContent,
  makeHeader,
  extractNumberOfLines,
  extractType,
  getFileNames,
  getTypeAndLength,
  getType} = require('./src/library.js');
const fs = require('fs');

const head = function(input) {
  let content = [];
  let delimiter = '';

  file = getFileNames(input);
  extractNumber = extractNumberOfLines(getTypeAndLength(input));
  let type = extractType(getTypeAndLength(input));

  for(let count=0; count<file.length; count++) {
    if(file.length > 1) {
      console.log(delimiter + makeHeader(file[count]));
      delimiter = '\n'
    }
    console.log(extractUsefulContent(fs.readFileSync(file[count],'utf8'),type,extractNumber));
  }
}
head(process.argv.slice(2));
