let {makeHeader , extractNumberOfLines} = require('../src/library.js');
let assert = require('assert');
describe('makeHeader', function(){

  it('should create a head line using a file name', function(){
    assert.equal(makeHeader('lib.js'),'==> lib.js <==');
    assert.equal(makeHeader('createHead.js'),'==> createHead.js <==');
  });

  it('should create a head line when file name is empty', function(){
    assert.equal(makeHeader(''), '==>  <==');
  });

  it('should create a head line when no file name is given', function(){
    assert.equal(makeHeader(), '==> undefined <==');
  });

});
describe('extractNumberOfLines', function(){

  it('should return the integer from input', function(){
    assert.equal(extractNumberOfLines(['-n1']),1);
    assert.equal(extractNumberOfLines(['./head.js','-c5']),5);
  });

  it('should return 10 when input have no integer', function(){
    assert.equal(''+extractNumberOfLines(['-n','-c']),10);
    assert.equal(''+extractNumberOfLines(['./head.js','-c']),10);
  });

  it('should return first integer when input have more then one integer', function(){
    assert.equal(extractNumberOfLines(['-n1','-c2']),1);
    assert.equal(extractNumberOfLines(['./head.js','c','12']),12);
  });
});
describe('makeHeader', () => {
  it('should return heading with two spaces if empty title(empty string) is given', () => {
    assert.equal(makeHeader(''),"==>  <==");
  });

  it('should return heading to given title', () => {
    assert.equal(makeHeader('abc'),"==> abc <==");
    assert.equal(makeHeader('file1'),"==> file1 <==");
  });
});

