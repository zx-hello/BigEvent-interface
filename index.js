// 启动服务 编写接口
const express = require('express')
const app = express()
app.listen(3333, () => {console.log('启动了学生数据接口')})