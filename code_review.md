Directory Structure:
src/library.js --> contains all the code, need to be extracted to their own files
    e.g. input.js
         error.js
         lib.js (head / tail) need better name
         file.js

Poor naming:
1   -> extractUsefulContent()
49, 52, 109-> variable names
54 -> findWronglVal()
73-> need to be plural
76-> extractNumber variable

Unnecessary comment/line:
23, 27 -> function represent what it is doing
133-> not used

Code Repetition:
37, 39 -> value was already assigned to a variable 
74,75 -> could have been assigned to a variable first & then used
76->    unnecessary assignment to object properties
90->    checkErrors() : calling the same function twice 
107-> checkErrors() is doing two different task
160, 169 -> getTailingLines & getTailingCharacters could have called one generic (split/join) function
8, 15-> getLines & getCharacters same as above

Argument order:
90, -> checkErrors
102-> processContents
131-> checkValueErrors
argument order has to known while calling these functions

32->    eval can be replaced
57,66 ->changing the value of parameter
67->    unnecessary if, ('1' / '0') could be removed with int (1 / 0) value 

Code Length:
102->   processContents() could be extracted in two functions

Suggestions:
49->    getFileNames() does not work for files with no extension
54-> findWronglVal() should give illegal option name also
78-> checkIllegalCountErrors() : is doing two different task (could be optimized using object)
131-> could be optimized using object

Test:::
Tests could have their seperate files
79-> could have used an array for input 
119,122 -> generateChars & createHeader never called
141-> if could have been removed
same it message used multiple times
