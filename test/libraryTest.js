let {makeHeader,getFileNames,getTypeAndLength, extractNumber,getLines,getCharacters} = require('../src/library.js');
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
describe('extractNumber', function(){

  it('should return the integer from input', function(){
    assert.equal(extractNumber(['-n1']),1);
    assert.equal(extractNumber(['./head.js','-c5']),5);
  });

  it('should return 10 when input have no integer and type is n', function(){
    assert.equal(extractNumber(['-n']),10);
  });

  it('should return 0 when input have no integer and type is c', function(){
    assert.equal(extractNumber(['-c']),0);
    assert.equal(extractNumber(['./head.js','-c']),0);
  });

  it('should return first integer when input have more then one integer', function(){
    assert.equal(extractNumber(['-n1','-c2']),1);
    assert.equal(extractNumber(['./head.js','c','12']),12);
  });
});

describe('getFileNames',function(){
  it('should return no filename if no input is given',function(){
    assert.deepEqual(getFileNames([]),[]);
  });
  it('should return filename if only one filename is given',function(){
    assert.deepEqual(getFileNames(['demo.txt']),['demo.txt']);
  });
  it('should return filenames from a number of parameters',function(){
    assert.deepEqual(getFileNames(['-n1','test.txt','log.txt']),['test.txt','log.txt']);
  });
});

describe("getLines",function() {
  it("should work for no line",function() {
    assert.deepEqual(getLines('',0), '' );
  });
  it('should return empty string with no input',function(){
    assert.deepEqual(getLines('',),'');
  });
  it("should work for single line",function() {
    assert.deepEqual( getLines('a',1), 'a' );
  });
  it("should work for multiple lines",function() {
    assert.deepEqual( getLines('a\nb\nc',2), 'a\nb' );
  });
  it("should work for less no of lines with more requirement of no of lines",function() {
    assert.deepEqual( getLines('a\nb\nc',5), 'a\nb\nc' );
  });
});
describe("getCharacters",function() {
  it("should work for single line",function() {
    assert.deepEqual( getCharacters("abc",2), "ab" );
  });
  it("should work for multiple lines",function() {
    assert.deepEqual( getCharacters("abc\nabc",2 ), "ab" );
    assert.deepEqual( getCharacters("abc\nabc",5 ), "abc\na" );
  });
  it("should return empty string for zero character requirement",function() {
    assert.deepEqual(getCharacters("abc",0), "" );
  });
  it('should return empty string for no input',function(){
    assert.deepEqual(getCharacters("abc", ), "" );
  });
});
describe('getTypeAndLength',function(){
  it('should return empty string with no input',function(){
    assert.equal(getTypeAndLength(['']),'');
  });
  it('should return type and length if no other argument is given',function(){
    assert.deepEqual(getTypeAndLength(['']),['']);
    assert.deepEqual(getTypeAndLength(['-n2','demo.js']),['-n2']);
    assert.deepEqual(getTypeAndLength(['-c1','demo.js','test.txt']),['-c1']);
  });
});
