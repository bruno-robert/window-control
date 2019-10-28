# window-control

window-control is a package aimed to do similar tasks as robot.js (without mouse control) but without the compiling of external C++ code.
On mac for example, window-control uses applescript to send keys, and change the focused window.

## using in electron

osascript cannot run .applescript files from the app.asar archive, so the module will have to be unpacked. 
In order to simplify this to the maximum. In this guide we will be using electron-builder to package the app.
In order to exclude window-control from the app.asar archive just include the following in the top level of package.json

```JSON
"build": {
    "asar": true,
    "asarUnpack": "node_modules/window-control/**/*"
}
 ```
 
 # example usage
 
 ```javascript
 const {focusWindow, sendKeys} = require('window-control')
 
 // resetFocus is an optional parameter that will reset the focus 
 // to the original window once the keys have been sent
 // sendKeys will send key presses to the application with the PID
 // in this example, "ls -l" is sent to the process with PID 2212
 sendKeys(2212, "ls -l", {resetFocus: true, (error, message) => {
    console.log(error)
    console.log(message)
 }})
 
 
 // focusWindow will set the focus the to window owned by the PID given (in this case 2212)
 focusWindow(2212, (error, message) => {
    console.log(error)
 }
 ```
