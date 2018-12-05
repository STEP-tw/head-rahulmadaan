const extractUsefulContent = function(content,type='1',limit=10) {
  if(type == '1') {
    return content.split('\n').slice(0,limit).join('\n');
  }
  return content.split('').slice(0,limit).join('');
}

const makeHeader = function(head) {
  return "==> "+head+" <==";
};

const extractNumberOfLines = function(inputParameters) {
  let string = inputParameters.join('');
  let index=0;
  while(!parseInt(string) && index < inputParameters.join('').length) {
    index++;
    string = inputParameters.join('');
    string = string.slice(index);
  }
  return Math.abs(parseInt(string)) || 10;
}
const getFileNames = (x=>x.filter(file => file.includes('.')));
const getTypeAndLength = (x=>x.filter(file => !file.includes('.')));

const extractType = function(input) {
  input = input.join('');
  if(input.includes('-c')) { return '0';}
  return 1;
}

const head = function(userInput,fs) {
  let data = [];

  let file = getFileNames(userInput);
  let extractNumber = extractNumberOfLines(getTypeAndLength(userInput));
  let type = extractType(getTypeAndLength(userInput));
  for(let count=0; count<file.length; count++) {
    if(file.length > 1) {
      data.push(delimiter + makeHeader(file[count]));
      delimiter = '\n'
    }
    let text = (fs.readFileSync(file[count],'utf8'));
    data.push(extractUsefulContent(text,type,extractNumber));
  }
  return data.join('\n');
}

module.exports={
  extractUsefulContent,
  extractNumberOfLines,
  head,
  extractType,
  makeHeader,
  getFileNames,
  getTypeAndLength
};
