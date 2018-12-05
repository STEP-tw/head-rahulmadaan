const {classifyParameters,extractUsefulContent,makeHeader,extractNumberOfLines,extractType} = require('./src/library.js');
const fs = require('fs');

const head = function(input) {
  let content = '';
  let delimiter = ''
  input =  classifyParameters(input)
  extractNumber = extractNumberOfLines(input[0]);
  fileNames = input[1];
  type = extractType(input[0]);

  for(let count=0; count<fileNames.length; count++) {
    if(fileNames.length > 1) {content += delimiter; content += makeHeader(fileNames[count]); content += '\n';}
    content += extractUsefulContent(fs.readFileSync(fileNames[count],'utf8'),type,extractNumber);
    delimiter = '\n';
  }
  console.log(content);
}
head(process.argv.slice(2));
