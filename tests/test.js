const index = require('./../index')


// index.getWindowList().then(windowList => {
//   console.log(windowList)
// }).catch(error => {
//   console.log(`Error: ${error}`)
// })

// make sure to enter a valid pid
index.sendKeys(1061123, 'ls -l', {resetFocus: true})
.then(message => {
  console.log(message)
}).catch(err => {
  console.log(`error is : ${err}`)
})
