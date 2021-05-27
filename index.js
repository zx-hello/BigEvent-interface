// 启动服务 编写接口
const express = require('express')
const app = express()
app.listen(3333, () => { console.log('启动了') })
const jwt = require('jsonwebtoken')

// 加密的模块
const md5 = require('md5')
// 配置 接收查询字符串格式的请求体
app.use(express.urlencoded({ extended: true }))

const db = require('./db')

// ------------注册接口
// 客户端发送请求 完成测试   http://localhost:3000/api/reguser
// 请求体username password(查询字符串) 请求方式 POST  
app.post('/api/reguser', (req, res) => {
  // 接收请求体  添加到数据库保存 验证用户名是否可用
  // console.log(req.body)
  let { username, password } = req.body
  db(`select * from user where username="${username}"`, (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({ status: 1, message: '已存在' })
    } else {
      // 添加到数据库之前 将密码加密 md5方式
      password = md5(password)
      db(`insert into user set username="${username}", password="${password}"`, (e, r) => {
        if (e) throw e
        res.send({ status: 0, message: '注册成功' })
      })
    }
  })
})

// --------------登录接口
// 请求方式 POST 接口地址  请求体 username password
app.post('/api/login', (req, res) => {
  let { username, password } = req.body
  password = md5(password)
  db(`select * from user where username="${username}" and password="${password}"`, (err, result) => {
    if (err) throw err
    // console.log(result)  // 无 则为空数组
    if (result.length > 0) {
      // let token = jwt.sign({对象格式的用户数据}, '字符串加密的key(随意填)', {对象格式的配置项(token有效期)}, 函数)
      let token = jwt.sign({id : result[0].id}, 'zzzxxx', {expiresIn : '2h'})
      res.send({status : 0, message : '登录成功', token : 'Bearer ' + token})
    }else {
      res.send({status : 1, message : '账号或密码错误'})
    }

  })
})