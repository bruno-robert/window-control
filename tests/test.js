const index = require('./../index')


// // make sure to enter a valid pid
// index.sendKeys(23561, 'echo "hello"', {resetFocus: true, pressEnterOnceDone: false, callback: (e, m) => {
//   console.log(`error: ${e}\nmessage: ${m}`)
// }})

// index.getProcessList((pslist) => {
//   console.log(pslist)
// })

// index.getWindowList((error, windowList) => {
//   console.log(error)
//   console.log(windowList)
// })

index.sendKeys('0x0420000a', 'echo "hello world"')