const { checkErrors,
  fileNotExistsError,
  findIllegalValue
} = require('./error.js');

const {makeHeader,extractNumber,classifyInput,getFileNames,getOptionAndNumber,extractType} = require('./parseInput.js');

const runCommand = function (content, limit, option = "1") {
  if (option == "1") {
    return getLines(content, limit);
  }
  return getCharacters(content, limit);
};
const getHeadContents = function (content, value, splitter, joiner) {
  return content.split(splitter).slice(0, value).join(joiner);
}
const getLines = function (content, value = 10) {
  return getHeadContents(content, value, '\n', '\n');
};

const getCharacters = function (content, value = 0) {
  return getHeadContents(content, value, '', '');
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
}

const tail = function (userInput, fs) {
  return processContents(userInput, "tail", fs);
};
const head = function (userInput, fs) {
  return processContents(userInput, 'head', fs);
}
const extractTailingContent = function (content, limit, option = "1") { // option -> n,c <== n=1 & c=0
  if (option == "1") {
    return getNTailingLines(content, limit);
  }
  return getNTailingCharacters(content, limit);
};
const getTailingContents = function (content, value, splitter, joiner) {
  return content.split(splitter).reverse().slice(0, value).reverse().join(joiner);
}
const getNTailingLines = function (content, limit = 10) {
  return getTailingContents(content, limit, '\n', '\n');
};

const getNTailingCharacters = function (content, limit = 0) {
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
  getNTailingCharacters,
  getNTailingLines,
  extractTailingContent
};
