const extractUsefulContent = function (content, value, type = "1") { // value -> n / c <== n=1 & c=0
  if (type == "1") {
    return getLines(content, value);
  }
  return getCharacters(content, value);
};

const getLines = function (content, value = 10) { // get specified lines from a file
  return content
    .split("\n")
    .slice(0, value)
    .join("\n");
};

const getCharacters = function (content, value = 0) { // get specified characters from a file
  return content
    .split("")
    .slice(0, value)
    .join("");
};

const makeHeader = function (title) {
  // to add header on file content
  return "==> " + title + " <==";
};
const extractNumber = function (userInput) {
  // extract value from user input
  let input = userInput.join("");

  let possibleErrorOne = input.includes("-c") && !input.match(/[0-9]/);
  let possibleErrorTwo = input.match(/[0]/) && !input.match(/[1-9]/);
  if (eval(possibleErrorOne) || eval(possibleErrorTwo)) {
    return 0;
  }

  let index = 0;
  while (!parseInt(input) && index < userInput.join("").length) {
    index++;
    input = userInput.join("");
    input = input.slice(index);
  }
  if (!userInput.includes("-c") && !userInput.includes("-n")) {
    return Math.abs(parseInt(input));
  }

  return parseInt(input);
};

const getFileNames = x =>
  x.filter(file => file.includes(".") || file.includes("_"));   // returns file names from user input

const getOptionAndNumber = x => x.filter(file => !file.includes(".")); // returns option and number from user input

const findWronglVal = function (options) {
  let list = "abdefghijklmopqrstuvwxyz";
  list = list.split("");
  options = options.join("");
  let value = "";
  if (list.some(x => options.includes(x))) {
    value = options.slice(2);
  }
  return value;
};

const extractType = function (input) { // extract option from user input
  input = input.join("");
  if (input.includes("-c")) {
    return '0';
  }
  return '1';
};
const classifyInput = function (userInput) { // for classification of input
  let file = getFileNames(userInput);
  let number = extractNumber(getOptionAndNumber(userInput)) || 10;
  let type = extractType(getOptionAndNumber(userInput));
  return { file: file, extractNumber: number, type: type };
};
const checkIllegalCountErrors = function(userInput,command,type) {
  let wrongValue = findWronglVal(getOptionAndNumber(userInput));
  if (wrongValue && type == "1" && command == 'head') {
    return command + ": illegal line count -- " + wrongValue;
  }
  if (wrongValue && type == "0" && command == 'head') {
    return command + ": illegal byte count -- " + wrongValue;
  }
  if (wrongValue && command == 'tail') {
    return command + ": illegal offset -- " + wrongValue;
  }
};
const checkErrors = function(userInput,command,type,fileName) {
  if(checkIllegalCountErrors(userInput,command,type)) {
    return checkIllegalCountErrors(userInput,command,type)
  }
  if(checkValueErrors(fileName, type, userInput, command)) {
    return checkValueErrors(fileName, type, userInput, command)
  }
}
const head = function (userInput, fs, command = "head") {
  // head command
  let data = [];
  let delimiter = "";
  let text = "";
  let { file, extractNumber, type } = classifyInput(userInput);
  let errors = checkErrors(userInput,command,type,file);
  if(errors) { return errors; }
  for (let count = 0; count < file.length; count++) {
    if (!fs.existsSync(file[count])) {
      data.push(command + ": " + file[count] + ": No such file or directory");
      count++;
    }
    if (count == file.length) {
      return data.join("\n");
    }
    if (file.length > 1) {
      data.push(delimiter + makeHeader(file[count]));
      delimiter = "\n";
    }
    text = fs.readFileSync(file[count], "utf8");
    if (command == "head")
      data.push(extractUsefulContent(text, extractNumber, type));
    if (command == "tail")
      data.push(extractTailingContent(text, extractNumber, type));
  }
  return data.join("\n");
};

const checkValueErrors = function (fileName, type, userInput, command) {
  let value = extractNumber(getOptionAndNumber(userInput));
  let invalidValue = value <= 0;

  if (value <= 0 && type == "1" && command == 'head') {
    return command + ": illegal line count -- " + value;
  }
  if (value <= 0 && type == "0" && command == 'head') {
    return command + ": illegal byte count -- " + value;
  }
  if(command == 'tail' && value==0) {
    return ' ';
  } 
};
const tail = function (userInput, fs) {
  // tail command
  return head(userInput, fs, "tail");
};
const extractTailingContent = function (content, limit, option = "1") { // option -> n,c <== n=1 & c=0
  if (option == "1") {
    return getTailingLines(content, limit);
  }
  return getTailingCharacters(content, limit);
};

const getTailingLines = function (content, limit = 10) { // get lines from tail of file
  return content
    .split("\n")
    .reverse()
    .slice(0, limit)
    .reverse()
    .join("\n");
};

const getTailingCharacters = function (content, limit = 0) { // get characters from tail of file
  return content
    .split("")
    .reverse()
    .slice(0, limit)
    .reverse()
    .join("");
};

module.exports = {
  extractUsefulContent,
  extractNumber,
  head,
  getLines,
  getCharacters,
  extractType,
  makeHeader,
  getFileNames,
  getOptionAndNumber,
  tail,
  getTailingCharacters,
  getTailingLines,
  extractUsefulContent,
  extractTailingContent
};
