const {app, BrowserWindow, protocol, remote} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({
	  width: 800, height: 600,
	  'web-preferences':{
		  'web-security':false
	  }
	})

  win.loadURL(url.format({
    pathname: path.resolve(__dirname,'public/index.html'),
    protocol: 'file:',
    slashes: true
  }))

	// win.loadURL(`file://${__dirname}/public/index.html`)
	// win.loadURL('file:///' + __dirname + "/public/index.html");

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

// app.on('ready', createWindow)

app.on('ready', () => {
	// protocol.interceptFileProtocol('file', (request, callback) => {
	//   const url = request.url.substr(7)    /* all urls start with 'file://' */
	//   callback({ path: path.normalize(`${app.getAppPath()}/${url}`)})
	// }, (err) => {
	//   if (err) console.error('Failed to register protocol')
	// })
	createWindow()
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

