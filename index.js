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
  } else if ( process.platform === 'linux' ) {
    const sendTextToWindowWithId = path.join(__dirname, 'linux', 'sendTextToWindowWithId.sh')
    exec(`${sendTextToWindowWithId} ${pid} ${keys}`, (error, stdout, stderr) => {
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

/**
 * Gets the list of open windows and returns it as an array of window objects.
 * Each object has a id, user and title attributes
 * - id is the window id
 * - user is the user that owns the process running the window
 * - title is the title of the window
 * @param {function} callback 
 */
const getWindowList = (callback) => {
  if (process.platform === 'linux') {
    const linuxGetWindowList = path.join(__dirname, 'linux', 'getWindowList.sh')
    exec(linuxGetWindowList, (error, stdout, stderr) => {
      if (error) {
        callback(error, null)
        return
      }
      if (stderr) {
        callback(stderr, null)
        return
      }
      windowStrings = stdout.split('\n')
      windowList = []

      windowStrings.forEach((windowString) => {
        let windowTitle = windowString.split(' ').slice(4).join(' ')
        windowObject = {id: windowString.split(' ')[0], user: windowString.split(' ')[3], title: windowTitle}
        windowList.push(windowObject)
      })
      callback(null, windowList)
    })
  } else {
    ccallback('platform not supported yet', null)
  }
}

module.exports = {
  focusWindow: focusWindow,
  sendKeys: sendKeys,
  getProcessList: getProcessList,
  getWindowList: getWindowList
}