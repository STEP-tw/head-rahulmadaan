const extractUsefulContent = function(content,type='1',limit=10) {
  if(type == '1') {
    return content.split('\n').slice(0,limit).join('\n');
  }
  return content.split('').slice(0,limit).join('');
}
const makeHeader = function(head) {
  return "==>"+head+"<==";
};

const classifyParameters = function(inputs=[]) {
  let fileNames = [];
  let otherParameters = [];
  if(!inputs[0].includes('-') && inputs.length >1) {return [];}
  otherParameters = inputs.slice(0,1)
  fileNames = inputs.slice(1);
  return [otherParameters,fileNames];
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

const getType = function(userInput) {
 let type = getTypeAndLength(userInput);
  if(type === []) {
    return 1;
  }
  return 0
}

const extactFileNames = function(userInput) {
  return classifyParameters(userInput)[0];
}
const extractType = function(input) {
  input = input.join('');
  if(input.includes('-c')) { return '0';}
  return 1;
}
module.exports={getType,extractUsefulContent , classifyParameters,extractNumberOfLines,extactFileNames,extractType,makeHeader,extractUsefulContent,getFileNames,getTypeAndLength};
