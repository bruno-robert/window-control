# window-control

window-control is a package aimed to do similar tasks as robot.js (without mouse control) but without the compiling of external C++ code.
On mac for example, window-control uses applescript to send keys, and change the focused window.

## using in electron

osascript cannot run .applescript files from the app.asar archive, so the module will have to be unpacked. 
In order to simplify this to the maximum. In this guide we will be using electron-builder to package the app.
In order to exclude window-control from the app.asar archive just include the following in the top level of package.json

```
"build": {
    "asar": true,
    "asarUnpack": "node_modules/window-control/**/*"
}
 ```
