const { extractNumber, getOptionAndNumber } = require('./library.js');

const illegalCountErrors = function (command, type, wrongValue) {
    let functionRef = {
        "head": headIllegalCountMessage,
        "tail": tailIllegalCountMessage
    }
    return functionRef[command](type, wrongValue);
};
const headIllegalCountMessage = function (type, value) {
    let messages = {
        "1": "head: illegal line count -- " + value,
        "0": "head: illegal byte count -- " + value
    }
    return messages[type];
};
const tailIllegalCountMessage = function (type, value) {
    let messages = {
        "1": "tail: illegal offset -- " + value,
        "0": "tail: illegal offset -- " + value
    }
    return messages[type];
}
const checkErrors = function (value, wrongValue, type, command) {
    if (wrongValue) {
        return illegalCountErrors(command, type, wrongValue);
    }
    if (checkValueErrors(value, command)) {
        return invalidCountMessages(command, value, type);
    }
}

const fileNotExistsError = function (command, fileName) {
    return command + ": " + fileName + ": No such file or directory";
}

const findIllegalValue = function (inputOptions) {
    let options = inputOptions.join("");
    let list = "abdefghijklmopqrstuvwxyz";
    list = list.split("");
    let value = "";
    if (list.some(x => options.includes(x))) {
        if (options.includes('-n') || options.includes('-c')) {
            value = options.slice(2);
        }
        if (!options.includes('-n') && !options.includes('-c')) {
            value = options.slice(1);
        }
    }
    return value;
};
const checkValueErrors = function (value, command) {
    let functionRef = {
        "head": isheadValidCount,
        "tail": isTailValidCount
    }
    if (functionRef[command](value)) {
        return true
    }
    return false;
};
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
};
const isheadValidCount = function (value) {
    return value <= 0;
}
module.exports = {
    checkErrors,
    fileNotExistsError,
    findIllegalValue
}