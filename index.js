require ('hazardous')  // makes this module work when it's unpacked from the app.asar package when the app is packed with electron-build
// it overloads path.join to change asar.app to asar.app.unpacked

const path = require('path')
const { exec } = require('child_process')
const focusWindowMacScript = path.join(__dirname, 'mac', 'setWindowFocus.applescript')
const focusAndSendKeys = path.join(__dirname, 'mac', 'focusAndSendKeysAndEnter.applescript')
const psList = require('ps-list')

/**
 * Focuses the first window of the process with the PID given
 * @param {integer} pid PID to use to find the application window
 * @param {function} callback callback, get error and message as parameters
 */
const focusWindow = (pid, callback) => {
  const emptyCallBack = () => {}
  callback = callback || emptyCallBack
  if ( process.platform === 'darwin' ) {
    exec(`osascript "${focusWindowMacScript}" ${pid}`, (error, stdout, stderr) => {
      if (error) {
        callback(error, null)
        return
      }
      if (stderr) {
        callback(stderr, null)
        return
      }
      callback(null, stdout)
    })
  } else if ( process.platform === 'win32' ) {
    // TODO: add windows support
    callback('Windows isn\'t supported yet', null)
  } else if ( process.platform === 'linux' ) {
    // TODO: add Linux support
    callback('Linux isn\'t supported yet', null)
  } else {
    callback('Platform not suported', null)
  }
  
}

/**
 * Focuses the first window of the PID given, then sends the cahracters in the keys string to the focused window by emulating the keyboard. 
 * Optionally, can focus back to the original application.
 * Optionally has a callback that gets (error, message) parameters for the error message (if any) and any output of the script
 * @param {integer} pid PID of the pcoess to focus
 * @param {string} keys string to send to the window
 * @param {*} [param2] optional parameters:
 *  - resetFocus: (default false) if set to true, will reset the focus to the original focus after sending the keys
 *  - pressEnterOnceDone: (default true) if set to true, will press enter once the keys have been sent
 *  - callback: (default ()=>{}) the callback to use once done
 */
const sendKeys = (pid, keys, {resetFocus = false, pressEnterOnceDone = true, callback = ()=>{}} = {}) => {
  if ( process.platform === 'darwin' ) {
    exec(`osascript "${focusAndSendKeys}" ${pid} '${keys}' ${resetFocus} ${pressEnterOnceDone}`, (error, stdout, stderr) => {
      if (error) {
        callback(error, null)
        return
      }
      if (stderr) {
        callback(stderr, null)
        return
      }
      callback(null, stdout)
    })
  } else if ( process.platform === 'win32' ) {
    // TODO: add windows support
    callback('Windows isn\'t supported yet', null)
  } else if ( process.platform === 'win3linux2' ) {
    // TODO: add Linux support
    callback('Linux isn\'t supported yet', null)
  } else {
    callback('Platform not suported', null)
  }
}

/**
 * Gets and returns the current process list
 * Works on Mac, Windows and Linux.
 * Works when packaged in app.asar on Mac and Linux but NOT Windows
 */
const getProcessList = async (callback) => {
  const processList = await psList()
  callback(processList)
}

const getWindowList = () => {
  if (process.platform === 'linux') {
    const linuxGetWindowList = path.join(__dirname, 'linux', 'getWindowList.sh')
    exec(linuxGetWindowList, (error, stdout, stderr) => {
      
    })
  } else {
    console.log('platform not supported yet')
  }
}

module.exports = {
  focusWindow: focusWindow,
  sendKeys: sendKeys,
  getProcessList: getProcessList
}