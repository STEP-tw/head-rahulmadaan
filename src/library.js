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
module.exports={
  extractUsefulContent,
  extractNumberOfLines,
  extractType,
  makeHeader,
  getFileNames,
  getTypeAndLength
};
