const extractUsefulContent = function(content, limit, type = "1") {
  if (type == "1") {
    return getLines(content, limit);
  }
  return getCharacters(content, limit);
};

const getLines = function(content, limit = 10) {
  // get specified lines from a file
  return content
    .split("\n")
    .slice(0, limit)
    .join("\n");
};

const getCharacters = function(content, limit = 0) {
  // get specified characters from a file
  return content
    .split("")
    .slice(0, limit)
    .join("");
};

const makeHeader = function(title) {
  return "==> " + title + " <==";
};
const extractNumber = function(userInput) {
  let input = userInput.join("");

  let conditionOne = input.includes("-c") && !input.match(/[0-9]/);
  let conditionTwo = input.match(/[0]/) && !input.match(/[1-9]/);

  if (eval(conditionOne) || eval(conditionTwo)) {
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
  x.filter(file => file.includes(".") || file.includes("_")); // returns file names from user input

const getOptionAndNumber = x => x.filter(file => !file.includes(".")); // returns option and number from user input

const findWronglVal = function(options) {
  let list = "abdefghijklmopqrstuvwxyz";
  list = list.split("");
  options = options.join("");
  let value = "";
  if (list.some(x => options.includes(x))) {
    value = options.slice(2);
  }
  return value;
};

const extractType = function(input) {
  // extract option from user input
  input = input.join("");
  if (input.includes("-c")) {
    return "0";
  }
  return "1";
};

const classifyInput = function(userInput) {
  // for classification of input
  let file = getFileNames(userInput);
  let number = extractNumber(getOptionAndNumber(userInput)) || 10;
  let type = extractType(getOptionAndNumber(userInput));
  return { file: file, extractNumber: number, type: type };
};

const illegalLineCount = function(wrongValue, type) {
  if (wrongValue && type == "1") {
    return command + ": illegal line count -- " + wrongValue;
  }
  if (wrongValue && type == "0") {
    return command + ": illegal byte count -- " + wrongValue;
  }
};

const invalidValueErrors = function(fileName, type, userInput, command) {
  // command => head / tail , type => n /c
  let value = extractNumber(getOptionAndNumber(userInput));
  let invalidValue = value <= 0;
  if (invalidValue && type == "1") {
    return command + ": illegal line count -- " + value;
  }
  if (invalidValue && type == "0") {
    return command + ": illegal byte count -- " + value;
  }
};

const checkError = function(userInput, command) {
  let { file, extractNumber, type } = classifyInput(userInput);
  let wrongValue = findWronglVal(getOptionAndNumber(userInput));
  let illegalCount = illegalLineCount(wrongValue, type);
  let error = invalidValueErrors(file, type, userInput, command);

  if (error) {
    return error;
  }
  if (illegalCount) {
    return illegalCount;
  }
};

const tail = function(userInput, fs) {
  return head(userInput, fs, "tail");
};
const extractTailingContent = function(content, numberOfLines, option = "1") {
  // option -> n,c <== n=1 & c=0
  if (option == "1") {
    return getTailingLines(content, numberOfLines);
  }
  return getTailingCharacters(content, numberOfLines);
};

const getTailingLines = function(content, numberOfLines = 10) {
  return content
    .split("\n")
    .reverse()
    .slice(0, numberOfLines)
    .reverse()
    .join("\n");
};

const getTailingCharacters = function(content, numberOfLines = 0) {
  return content
    .split("")
    .reverse()
    .slice(0, numberOfLines)
    .reverse()
    .join("");
};

const readFile = function(fileName, value, type, command, fs) {
  // return the contents of given file
  let text = fs.readFileSync(fileName, "utf8");
  if (command == "head") return extractUsefulContent(text, value, type);
  if (command == "tail") return extractTailingContent(text, value, type);
};

const head = function(userInput = [], fs, command = "head") {
  let data = [];
  let delimiter = "";
  let { file, extractNumber, type } = classifyInput(userInput);
  let errorCheck = checkError(userInput, command);
  if (errorCheck) {
    return errorCheck;
  }
  for (let count = 0; count < file.length; count++) {
    if (fs.existsSync(file[count])) {
      if (count == file.length) {
        return data.join("\n");
      }
      if (file.length > 1) {
        data.push(delimiter + makeHeader(file[count]));
        delimiter = "\n";
      }
      data.push(readFile(file[count], extractNumber, type, command, fs));
    }
    if (!fs.existsSync(file[count]))
      data.push(command + ": " + file[count] + ": No such file or directory");
  }
  return data.join("\n");
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
  tail
};
