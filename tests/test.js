const index = require('./../index')

// make sure to enter a valid pid
index.sendKeysAndEnter(23561, 'ls -l')

console.log(index.getScriptPath())