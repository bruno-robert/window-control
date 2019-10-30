// const index = require('./../index')
const path = require('path')
const { exec } = require('child_process')
const JSON5 = require('json5')

// // make sure to enter a valid pid
// index.sendKeys(23561, 'echo "hello"', {resetFocus: true, pressEnterOnceDone: false, callback: (e, m) => {
//   console.log(`error: ${e}\nmessage: ${m}`)
// }})

// index.getProcessList((pslist) => {
//   console.log(pslist)
// })

const getWindowList = (callback) => {
  return new Promise((resolve, reject) => {
    const getWindowList = path.join(__dirname, 'mac', 'getWindowList.applescript')
    exec(`osascript '${getWindowList}'`, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      if (stderr) {
        let winList = JSON5.parse(stderr).data
        resolve(winList)
      } else {
        let winList = JSON5.parse(stdout).data
        resolve(winList)
      }
    })
  })
  

}

getWindowList().then(windowList => {
  console.log(windowList)
}).catch(error => {
  console.log(error)
})

