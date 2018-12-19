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

const parseUserInput = function (userInput) {
    let result = {};
    result.files = userInput.filter(file => !file.startsWith("-") && !file.match(/^\d/));
    result.options = userInput.slice(0, userInput.length - result.files.length);
    return result;
};


const classifyInput = function (userInput) {
    let input = parseUserInput(userInput);
    let file = input.files;
    let optionAndNumber = input.options;
    let number = extractNumber(optionAndNumber) || 10;
    let type = extractType(optionAndNumber);

    return { file, number, type };
};

module.exports = { makeHeader, extractNumber, getFileNames, getOptionAndNumber, extractType, classifyInput }
