const extractUsefulContent = function(content, limit, type = "1") {
  if (type == "1") {
    return getLines(content, limit);
  }
  return getCharacters(content, limit);
};
const getLines = function(content, limit = 10) {
  return content.split("\n").slice(0, limit).join("\n");
};

const getCharacters = function(content, limit = 0) {
  return content.split("").slice(0, limit).join("");
};

const makeHeader = function(head) {
  return "==> " + head + " <==";
};
const extractNumber = function(userInput) {
  let input = userInput.join("");

  let conditionOne = input.includes("-c") && !input.match(/[0-9]/);
  let conditionTwo = input.match(/[0]/) && !input.match(/[1-9]/);
  if(eval(conditionOne) || eval(conditionTwo)) {
    return 0;
  }

  let index = 0;
  while (!parseInt(input) && index < userInput.join("").length) {
    index++;
    input = userInput.join("");
    input = input.slice(index);
  }
  if(!userInput.includes('-c') && !userInput.includes('-n')) { return Math.abs(parseInt(input));  }

  return parseInt(input);
}

const getFileNames = x =>
  x.filter(file => file.includes(".") || file.includes("_"));
const getTypeAndLength = x => x.filter(file => !file.includes("."));

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
  input = input.join("");
  if (input.includes("-c")) {
    return "0";
  }
  return 1;
};
const classifyInput = function(userInput) {
  let file = getFileNames(userInput);
  let limit = extractNumber(getTypeAndLength(userInput)) || 10;
  let type = extractType(getTypeAndLength(userInput));
  return { file: file, extractNumber: limit, type: type };
};

const head = function(userInput = [], fs,command = 'head') {
  let data = [];
  let delimiter = "";
  let text = "";
  let { file, extractNumber, type } = classifyInput(userInput);
  let wrongValue = findWronglVal(getTypeAndLength(userInput));
  if (wrongValue && type == '1') {
    return command + ": illegal line count -- " + wrongValue;
  }
  if (wrongValue && type == '0') {
    return command+": illegal byte count -- " + wrongValue;
  }
  let error = checkErrors(file, type,userInput,command);
  if (error) {
    return error;
  }

  for (let count = 0; count < file.length; count++) {
    if (!fs.existsSync(file[count])) {
      data.push(command+": " + file[count] + ": No such file or directory");
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
    if(command == 'head') 
      data.push(extractUsefulContent(text, extractNumber, type));
    if(command == 'tail')
      data.push(extractTailingContent(text, extractNumber, type));
  }
  return data.join("\n");
};

const checkErrors = function(fileName, type,userInput,command) {
  // console.log(type); 
  let value = extractNumber(getTypeAndLength(userInput));
  let invalidValue = value <= 0;
  if (invalidValue && type == "1") {
    return command+": illegal line count -- " + value;
  }
  if (invalidValue && type == "0") {
   return command+": illegal byte count -- " + value;
  }
  // return 0;
};
const tail = function(userInput,fs) {
  return head(userInput,fs,'tail');
}
const extractTailingContent = function(content, limit, type = "1") {
  if (type == "1") {
    return getTailingLines(content, limit);
  }
  return getTailingCharacters(content, numberOfLines);
};
const getTailingLines = function(content, limit = 10) {
  return content.split("\n").reverse().slice(0, limit).reverse().join("\n");
};

const getTailingCharacters = function(content, limit = 0) {
  return content.split("").reverse().slice(0, limit ).reverse().join("");
};
module.exports = {
  getLines,
  getCharacters,
  getTailingLines,
  getTailingCharacters,
  head,
  tail,
  extractUsefulContent,
  extractTailingContent,
  readFile,
  extractNumber,
  extractType,
  makeHeader,
  getFileNames,
<<<<<<< HEAD
  getOptionAndNumber,
  findWronglVal,
  illegalLineCount,
  invalidValueErrors,
  checkError,
  classifyInput,
};
=======
  getTypeAndLength,
  tail
}
>>>>>>> parent of c68b98f... code refactored...simplified names and added comments
