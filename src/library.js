const extractUsefulContent = function(content,type='1',limit) {
  if(type == '1') {
  return getLines(content,limit);
  }
  return getCharacters(content,limit);
}

const getLines = function(content,limit=10) {
  return content.split('\n').slice(0,limit).join('\n');
}

const getCharacters = function(content,limit=0){
  return content.split('').slice(0,limit).join('');
}

const makeHeader = function(head) {
  return "==> "+head+" <==";
};

const extractNumber = function(inputParameters) {
  let string = inputParameters.join('');
  if(string.includes('-c') && !string.match(/[0-9]/)) {
    return 0; 
  }
  if(string.match(/[0]/) && !string.match(/[1-9]/)) {
    return 0; 
  }
  let index=0;
  while(!parseInt(string) && index < inputParameters.join('').length) {
    index++;
    string = inputParameters.join('');
    string = string.slice(index);
  }
  return Math.abs(parseInt(string)) || 10;
}

const getFileNames = (x=>x.filter(file => file.includes('.') || file.includes('_')));
const getTypeAndLength = (x=>x.filter(file => !file.includes('.')));

const extractType = function(input) {
  input = input.join('');
  if(input.includes('-c')) { return '0';}
  return 1;
}
const classifyInput = function(userInput) {
  let file = getFileNames(userInput);
  let limit = extractNumber(getTypeAndLength(userInput));
  let type = extractType(getTypeAndLength(userInput));
  return {file:file, extractNumber:limit, type:type};
}

const head = function(userInput=[],fs) {
  let data = [];
  let delimiter = '';
  let text = '';
  let {file,extractNumber,type} = classifyInput(userInput);
  for(let count=0; count<file.length; count++) {
    if(!fs.existsSync(file[count])) {
      data.push('head: '+ file[count]+': No such file or directory'); count++; 
    }
    if(count == file.length) {  return data.join('\n');  }
    if(file.length > 1) {
      data.push(delimiter + makeHeader(file[count]));
      delimiter = '\n'
    }
    text = (fs.readFileSync(file[count],'utf8'));
    data.push(extractUsefulContent(text,type,extractNumber));
  }
  return data.join('\n');
}
module.exports={
  extractUsefulContent,
  extractNumber,
  head,
  getLines,
  getCharacters,
  extractType,
  makeHeader,
  getFileNames,
  getTypeAndLength
};
