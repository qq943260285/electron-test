// 用于控制应用程序生命周期和创建本机浏览器窗口
const {app, BrowserWindow} = require('electron')

// 保持窗口对象的全局引用，如果不这样做，当垃圾收集javascript对象时窗口将自动关闭。
let mainWindow

function createWindow() {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({width: 300, height: 600})
    // 并加载应用程序的index.html。
    mainWindow.loadFile('index.html')


    //创建无边框窗口
    let xyzs = new BrowserWindow({width: 500, height: 500,transparent: true, frame: false})
    // 加载远程URL
    xyzs.loadURL('https://baidu.com')


    // 打开devtools。
    // mainWindow.webContents.openDevTools()

    // 窗户关闭时发出的声音。
    mainWindow.on('closed', function () {
        // 取消引用窗口对象，如果您的应用程序支持多窗口，
        // 通常您会将窗口存储在数组中，这是您应该删除相应元素的时间。
        mainWindow = null
    })
}

// 当电子完成初始化并准备创建浏览器窗口时，将调用此方法。
// 某些api只能在此事件发生后使用。
app.on('ready', createWindow)

// 所有窗户关闭时退出。
app.on('window-all-closed', function () {
    // 在OS x上，应用程序及其菜单栏通常保持活动状态，直到用户使用cmd + q显式退出
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // 在os x上，当点击停靠栏图标并且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
    if (mainWindow === null) {
        createWindow()
    }
})

// 在此文件中，您可以包含应用程序的其余特定主进程代码。您也可以将它们放在单独的文件中并在此处要求它们。
