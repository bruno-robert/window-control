const index = require('./../index')

// make sure to enter a valid pid
index.sendKeys(23561, 'echo "hello"', {resetFocus: true, pressEnterOnceDone: false, callback: (e, m) => {
  console.log(`error: ${e}\nmessage: ${m}`)
}})