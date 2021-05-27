// 启动服务 编写接口
const express = require('express')
const app = express()
app.listen(3333, () => { console.log('启动了') })


// 配置 接收查询字符串格式的请求体
app.use(express.urlencoded({ extended: true }))

// 加载路由模块
const login = require('./routers/login')
app.use('/api', login)