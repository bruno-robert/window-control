const index = require('./../index')

// make sure to enter a valid pid
index.sendKeysAndEnter(23561, 'echo "hello"', (e, m) => {
  console.log(`error: ${e}\nmessage: ${m}`)
})