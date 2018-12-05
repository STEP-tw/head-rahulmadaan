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
  let input = 0;
  inputParameters = inputParameters.join('');
  let index=1;
  while(!parseInt(inputParameters)) {
    inputParameters = inputParameters.slice(index);
    input = inputParameters;
  }
  return Math.abs(input);
}
const extactFileNames = function(userInput) {
  return classifyParameters(userInput)[0];
}
const extractType = function(input) {
  input = input.join('');
  if(input.includes('-n')) { return '1';}
  return 0;
}
module.exports={extractUsefulContent , classifyParameters,extractNumberOfLines,extactFileNames,extractType,makeHeader,extractUsefulContent};
