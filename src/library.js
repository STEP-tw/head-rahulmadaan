const runCommand = function (content, limit, option = "1") { // type -> n / c <== n=1 & c=0
  if (option == "1") {
    return getLines(content, limit);
  }
  return getCharacters(content, limit);
};
const getHeadContents = function (content, value, splitter, joiner) {
  return content.split(splitter).slice(0, value).join(joiner);
}
const getLines = function (content, value = 10) { // get specified lines from a file
  return getHeadContents(content, value, '\n', '\n');
};

const getCharacters = function (content, value = 0) { // get specified characters from a file
  return getHeadContents(content, value, '', '');
};

const makeHeader = function (title) {
  return "==> " + title + " <==";
};
const extractNumber = function (userInput) {
  let input = userInput.join("");
  if (input.includes("-c") && !input.match(/[0-9]/)) {
    return 0;
  };
  if (input.match(/[0]/) && !input.match(/[1-9]/)) {
    return 0;
  };
  let index = 0;
  let slicedInput = input;
  while (!parseInt(slicedInput) && index < input.length) {
    index++;
    slicedInput = input.slice(index);
  }
  if (!userInput.includes("-c") && !userInput.includes("-n")) {
    return Math.abs(parseInt(slicedInput));
  }

  return parseInt(slicedInput);
};

const getFileNames = userInput =>
  userInput.filter(file => file.includes(".") || file.includes("_"));


const getOptionAndNumber = userInput =>
  userInput.filter(argv => !argv.includes("."));

const findIllegalValue = function (inputOptions) {
  let options = inputOptions;
  let list = "abdefghijklmopqrstuvwxyz";
  list = list.split("");
  options = options.join("");
  let value = "";
  if (list.some(x => options.includes(x))) {
    value = options.slice(2);
  }
  return value;
};

const extractType = function (userInput) {
  let input = userInput.join("");
  if (input.includes("-c")) {
    return '0';
  }
  return '1';

};
const classifyInput = function (userInput) {
  let file = getFileNames(userInput);
  let optionAndNumber = getOptionAndNumber(userInput);
  let number = extractNumber(optionAndNumber) || 10;
  let type = extractType(optionAndNumber);

  return { file, number, type };
};

const checkIllegalCountErrors = function (userInput, command, type) {
  let wrongValue = findIllegalValue(getOptionAndNumber(userInput));
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
const checkErrors = function (userInput, command, type) {
  let value = extractNumber(getOptionAndNumber(userInput));
  if (checkIllegalCountErrors(userInput, command, type)) {
    return checkIllegalCountErrors(userInput, command, type)
  }
  if(checkValueErrors(value,command)) {
    return invalidCountMessages(command, value, type); 
  }
}

const fileNotExistsError = function (command, fileName) {
  return command + ": " + fileName + ": No such file or directory";
}
const isFileExists = function (fileName, fs) {
  return fs.existsSync(fileName);
}
const readFile = function (fileName, fs) {
  return fs.readFileSync(fileName, 'utf8')
}
const processContents = function (userInput, command, fs) {

  let data = [];
  let delimiter = "";
  let text = "";
  let { file, number, type } = classifyInput(userInput);
  let errors = checkErrors(userInput, command, type, file);
  if (errors) { return errors; }
  for (let count = 0; count < file.length; count++) {
    if (!isFileExists(file[count], fs)) {
      data.push(fileNotExistsError(command, file[count]));
      count++;
    }
    if (count == file.length) {
      return data.join("\n");
    }
    if (file.length > 1) {
      data.push(delimiter + makeHeader(file[count]));
      delimiter = "\n";
    }
    text = readFile(file[count], fs);
    if (command == "head")
      data.push(runCommand(text, number, type));
    if (command == "tail")
      data.push(extractTailingContent(text, number, type));
  }
  return data.join("\n");
};
const checkValueErrors = function (value, command) {
   let functionRef = {
     "head" : isheadValidCount,
     "tail" : isTailValidCount
   }
   if(functionRef[command](value)) {
    return true
   } 
   return false;
};
const isheadValidCount = function (value) {
  return value <= 0;
}
const invalidCountMessages = function (command, value, type) {
  let message = {
    "head": {
      "1": "head: illegal line count -- " + value,
      "0": "head: illegal byte count -- " + value
    },
    "tail": {
      "1": " ",
      "0": " "
    }
  }
  return message[command][type];
}
const isTailValidCount = function (value) {
  return value == 0;
}
const tail = function (userInput, fs) {
  return processContents(userInput, "tail", fs);
};
const head = function (userInput, fs) {
  return processContents(userInput, 'head', fs);
}
const extractTailingContent = function (content, limit, option = "1") { // option -> n,c <== n=1 & c=0
  if (option == "1") {
    return getTailingLines(content, limit);
  }
  return getTailingCharacters(content, limit);
};
const getTailingContents = function (content, value, splitter, joiner) {
  return content.split(splitter).reverse().slice(0, value).reverse().join(joiner);
}
const getTailingLines = function (content, limit = 10) { // get lines from tail of file
  return getTailingContents(content, limit, '\n', '\n');
};

const getTailingCharacters = function (content, limit = 0) { // get characters from tail of file
  return getTailingContents(content, limit, '', '');
};

module.exports = {
  runCommand,
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
  extractTailingContent
};
