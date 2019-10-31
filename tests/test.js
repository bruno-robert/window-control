const index = require('./../index')


index.getWindowList().then(windowList => {
  console.log(windowList)
}).catch(error => {
  console.log(`Error: ${error}`)
})

// make sure to enter a valid pid
// index.sendKeys(1081608, 'echo "hello"', {resetFocus: true})
// .then(message => {
//   console.log(message)
// })
