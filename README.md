# window-control

window-control is a package aimed to do similar tasks as robot.js (without mouse control) but without the compiling of external C++ code.
On mac for example, window-control uses applescript to send keys, or change the focused window.

## pre-installation - Linux

In order to run on linux, window-control requires ```wmctrl``` and ```xdotool``` to be installed. On debian you can install them with (if they are not already installed):

```
sudo apt install wmctrl xdotool
```

## Installation (all platforms)

```
npm install window-control
```

## example usage

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

## Available functions

### sendKeys

```sendKeys(pid, keys, {resetFocus = false, pressEnterOnceDone = true, callback = ()=>{}} = {})```

Sends ```keys``` to the window as keyboard input.

#### Parameters

- ```pid```: (integer) the windowID (Linux and Windows) or PID (MacOS) of the app to send the keys to 

- ```keys```: (string) keys to send

- ```resetFocus```: (optional, bool) if set to true, the focus will be reset to how it was before the function was called

- ```pressEnterOnceDone```: (optional bool) if set to true, the enter key will be pressed once the keys are sent

- ```callback```: (optional function) the callback to use, will get the following parameters (```error```, ```output```) containing any error message or output of the executable used (this changes depending onthe platform)

### focusWindow

```focusWindow(pid, callback)```

Sets the focus to the window with ```pid```

#### Parameters

- ```pid```: (integer) windowID or PID of the window to focus

- ```callback```: (optional function) the callback to use, will get the following parameters (```error```, ```output```) containing any error message or output of the executable used (this changes depending onthe platform)

### getProcessList

```getProcessList(callback)```

On MacOS, gets the list of active processes.

#### Parameters

- ```callback```: (function) callback with the following parameter ```processList```, an array of process objects. Each object has the following attributes:

  - ```pid```: process PID

  - ```name```: process name

  - ```cmd```: process command

  - ```ppid```: process PPID

  - ```uid```: process UID

  - ```cpu```: process CPU utilisation

  - ```memory```: process memory usage

### getWindowList

```getWindowList(callback)```

Gets a list of windows open.

#### Parameters

- ```callback```: (function) callback with the following parameter ```windowList```, an array of window objects. Each object has the following attributes:

  - ```id```: windowID of the window
  
  - ```user```: user whos owns the process behind the window

  - ```title```: title of the window
