let { makeHeader,
  head,
  getFileNames,
  getOptionAndNumber,
  extractNumber,
  getLines,
  getCharacters,
  getTailingLines,
  getTailingCharacters,
  tail
} = require('../src/library.js');
let assert = require('assert');

describe('makeHeader', function () {

  it('should create a head line using a file name', function () {
    assert.equal(makeHeader('lib.js'), '==> lib.js <==');
    assert.equal(makeHeader('createHead.js'), '==> createHead.js <==');
  });

  it('should create a head line when file name is empty', function () {
    assert.equal(makeHeader(''), '==>  <==');
  });

  it('should create a head line when no file name is given', function () {
    assert.equal(makeHeader(), '==> undefined <==');
  });

});
describe('extractNumber', function () {

  it('should return the integer from input', function () {
    assert.equal(extractNumber(['-n1']), 1);
    assert.equal(extractNumber(['./head.js', '-c5']), 5);
  });

  it('should return 0 when input have no integer and type is c', function () {
    assert.equal(extractNumber(['-c']), 0);
    assert.equal(extractNumber(['./head.js', '-c']), 0);
  });

  it('should return first integer when input have more then one integer', function () {
    assert.equal(extractNumber(['-n1', '-c2']), 1);
    assert.equal(extractNumber(['./head.js', 'c', '12']), 12);
  });
});

describe('getFileNames', function () {
  it('should return no filename if no input is given', function () {
    assert.deepEqual(getFileNames([]), []);
  });
  it('should return filename if only one filename is given', function () {
    assert.deepEqual(getFileNames(['demo.txt']), ['demo.txt']);
  });
  it('should return filenames from a number of parameters', function () {
    assert.deepEqual(getFileNames(['-n1', 'test.txt', 'log.txt']), ['test.txt', 'log.txt']);
  });
});

describe("getLines", function () {
  it("should work for no line", function () {
    assert.deepEqual(getLines('', 0), '');
  });
  it('should return empty string with no input', function () {
    assert.deepEqual(getLines(''), '');
  });
  it("should work for single line", function () {
    assert.deepEqual(getLines('a', 1), 'a');
  });
  it("should work for multiple lines", function () {
    assert.deepEqual(getLines('a\nb\nc', 2), 'a\nb');
  });
  it("should work for less no of lines with more requirement of no of lines", function () {
    assert.deepEqual(getLines('a\nb\nc', 5), 'a\nb\nc');
  });
});
describe("getCharacters", function () {
  it("should work for single line", function () {
    assert.deepEqual(getCharacters("abc", 2), "ab");
  });
  it("should work for multiple lines", function () {
    assert.deepEqual(getCharacters("abc\nabc", 2), "ab");
    assert.deepEqual(getCharacters("abc\nabc", 5), "abc\na");
  });
  it("should return empty string for zero character requirement", function () {
    assert.deepEqual(getCharacters("abc", 0), "");
  });
  it('should return empty string for no input', function () {
    assert.deepEqual(getCharacters("abc"), "");
  });
});
describe('getOptionAndNumber', function () {
  it('should return empty string with no input', function () {
    assert.equal(getOptionAndNumber(['']), '');
  });
  it('should return type and length if no other argument is given', function () {
    assert.deepEqual(getOptionAndNumber(['']), ['']);
    assert.deepEqual(getOptionAndNumber(['-n2', 'demo.js']), ['-n2']);
    assert.deepEqual(getOptionAndNumber(['-c1', 'demo.js', 'test.txt']), ['-c1']);
  });
});

//==========================Functions necessary for testing head function(STARTS HERE)======================================
const generateContent = function (length) {
  let content = [];
  for (let count = 1; count <= length; count++) {
    content.push(count);
  }
  return content;
}
const generateLines = function (numberOfLines) {
  return generateContent(numberOfLines).join('\n');
}
const generateChars = function (numberOfChars) {
  return generateContent(numberOfChars).join('');
}
const createHeader = function (head) {
  return "==> " + head + " <==";
}
const joinFiles = function (file1, file2) {
  let content = [];
  content.push(createHeader(file1));
  content.push(file1);
  content.push('\n');
  content.push(createHeader(file2));
  content.push(file2);
  return content.join('\n');
}
const fs = {};
files = {
  "fiveLines.txt": generateLines(5),
  "tenLines.txt": generateLines(10),
  "fifteenLines.txt": generateLines(15),
  "noLines.txt": generateLines(0),
}
joins = {
  "twoFilesWithLines": joinFiles(files["tenLines.txt"], files["tenLines.txt"])
}

fs.readFileSync = function (path, encoding) {
  if (encoding != 'utf8') return;
  const content = files[path];
  if (content == undefined) return "no such file " + path;
  return content;
};

fs.existsSync = function (path) {
  if (files[path] == undefined) return false;
  return true;
}
//==========================Functions necessary for testing head function(ENDS HERE)================================

describe("head", () => {
  describe('empty file as input', function () {
    it('should return no content if empty file is given in input', function () {
      assert.equal(head(["noLines.txt"], fs), '');
    });
  });
  describe('for 10 lines as output', function () {
    it('should return 10 lines if only filename is given', function () {
      assert.equal(head(['fifteenLines.txt'], fs), files["tenLines.txt"]);
    });
    it('should return 10 lines if only dash is given', function () {
      assert.equal(head(['--', 'fifteenLines.txt'], fs), files["tenLines.txt"]);
    });
  });

  describe('for 5 lines as outupt', function () {
    it('should return 5 lines if type is n and option is 5 as input', function () {
      assert.equal(head(['-n5', 'fifteenLines.txt'], fs), files["fiveLines.txt"]);
    });
    it("should return 5 lines if only value is given with a '-'", function () {
      assert.equal(head(['--', 'fifteenLines.txt'], fs), files["tenLines.txt"]);
    });
  });
});
describe('head (for two files)', function () {
  it("should return number of input lines with 2 files", function () {
    const expectedOut = [
      "==> fiveLines.txt <==" + "\n" + generateLines(5) + "\n",
      "==> fifteenLines.txt <==" + "\n" + generateLines(10)].join('\n');
    assert.deepEqual(head(["fiveLines.txt", "fifteenLines.txt"], fs), expectedOut);
  });
});
describe('getTailingLines', function () {
  let text = 'dfs\ndfs\nfd\ngre\ngfe';
  it('should return given number of tailing lines from the text', function () {
    assert.deepEqual(getTailingLines(text, 2), 'gre\ngfe');
    assert.deepEqual(getTailingLines(text, 1), 'gfe');
    assert.deepEqual(getTailingLines(text, 6), text);
  });
})
describe('getTailingCharacters', function () {
  let text = 'jd djf \n kfd fdhj';
  it('should return given number of tailing characters from the text', function () {
    assert.deepEqual(getTailingCharacters(text, 2), 'hj');
    assert.deepEqual(getTailingCharacters(text, 5), ' fdhj');
    assert.deepEqual(getTailingCharacters(text, 8), 'kfd fdhj');
    assert.deepEqual(getTailingCharacters(text, 20), text);
  });
});
describe('head -- illegal line count', function () {
  it('should give illegal line count error', function () {
    let expected_output = 'head: illegal line count -- 0';
    assert.equal(head(['-0', 'tenLines.txt'], fs, 'head'), expected_output);
  });
  it('should return 5 lines', function () {
    let fiveLines = generateLines(5);
    assert.deepEqual(head(['-n5', 'tenLines.txt'], fs, 'head'), fiveLines);
  });
  it('should return error when missing file is given', function () {
    let errorMessage = "head: missingFile.txt: No such file or directory";
    assert.deepEqual(head(['missingFile.txt'], fs), errorMessage);
  });
  it('should give illegal count error for negative count', function () {
    let expected_output = "head: illegal line count -- -1";
    assert.deepEqual(head(['-n', '-1', 'fiveLines.txt'], fs), expected_output);
  });
  it('should give illegal count error for alphabet', function () {
    let expected_output = "head: illegal line count -- a";
    assert.deepEqual(head(['-n', 'a', 'fiveLines.txt'], fs), expected_output);
  });
  it('should give illegal line count error', function () {
    let expected_output = "head: illegal line count -- a";
    assert.deepEqual(head(['-na', 'fiveLines.txt'], fs), expected_output);
  });
});
describe(' head "c" ', function () {

  it('should give singleCharacter', function () {
    let expected_output = '1';
    assert.equal(head(['-c', '1', 'fiveLines.txt'], fs), expected_output);
  });

  it('should give 1 as result', function () {
    let expected_output = '1';
    assert.equal(head(['-c1', 'fiveLines.txt'], fs), expected_output);
  });

  it('should give illegal count error', function () {
    let expected_output = 'head: illegal byte count -- 0'
    assert.equal(head(['-c0', 'fiveLines.txt'], fs), expected_output);
  });

  it('should give illegal byte error', function () {
    let expected_output = 'head: illegal byte count -- 0'
    assert.equal(head(['-c', '0', 'fiveLines.txt'], fs), expected_output);
  });

  it('should give illegal count error', function () {
    let expected_output = 'head: illegal byte count -- a';
    assert.equal(head(['-ca','fiveLines.txt'],fs), expected_output);
  });
  it('should give illegal count error', function () {
    let expected_output = 'head: illegal byte count -- a';
    assert.equal(head(['-c','a','fiveLines.txt'],fs), expected_output);
  });
  it('should give illegal count error', function () {
    let expected_output = 'head: illegal byte count -- -2';
    assert.equal(head(['-c','-2','fiveLines.txt'],fs), expected_output);
  });
});
