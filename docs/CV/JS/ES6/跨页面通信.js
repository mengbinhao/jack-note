//1 使用句柄(可跨域，但是只能跟打开的界面进行通信)
//父页面
let child = window.open('child.html', 'child')

child.onload = () => {
	child.postMessage('hi', location.origin)
}

//子页面
window.onmessage = (msg) => {}

//2 localStorage,不能跨域
//a 页面
localStorage.setItem('msg', 'hi')
//b 页面
window.onstorage = (msg) => {}

//3 broadcastchannel 兼容性不好
//a 页面
const bc = new BroadcastChannel('test_channel')
bc.onmessage = msg = {}
//b 页面
const bc = new BroadcastChannel('test_channel')
bc.postMessage('hello')

//4 cookie 没有事件通知机制，只能在另外一个界面寻轮脏数据检查
document.cookie

//5 websocket 监听同一个服务器地址，跨窗口跨浏览器，需服务端配合
// send(data) 发送数据
const socket = new WebSocket('ws://localhost:8080')

// Connection opened
socket.addEventListener('open', (event) => {
	socket.send('Hello Server!')
})

// 接收数据
socket.addEventListener('message', (event) => {
	console.log('Message from server ', event.data)
})
