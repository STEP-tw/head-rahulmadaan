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
module.exports = {makeHeader,extractNumber,getFileNames,getOptionAndNumber,extractType}
