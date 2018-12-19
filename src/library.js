const { checkErrors,
  fileNotExistsError,
  findIllegalValue
} = require('./error.js');

const runCommand = function (content, limit, option = "1") { // option -> n / c <== n=1 & c=0
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


const isFileExists = function (fileName, fs) {
  return fs.existsSync(fileName);
}
const readFile = function (fileName, fs) {
  return fs.readFileSync(fileName, 'utf8')
}
const processContents = function (userInput, command, fs) {

  let data = [];
  let delimiter = "";
  let { file, number, type } = classifyInput(userInput);
  let value = extractNumber(getOptionAndNumber(userInput));
  let wrongValue = findIllegalValue(getOptionAndNumber(userInput));
  let errors = checkErrors(value, wrongValue, type, command);
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
    let text = readFile(file[count], fs);
    data.push(getContents(command, text, number, type))
  }
  return data.join("\n");
};

const getContents = function (command, text, number, option) {
  let commands = {
    "head": runCommand,
    "tail": extractTailingContent
  };
  return commands[command](text, number, option);
  // content limit option
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
