// 连接数据库 封装成函数
function db(sql, callback) {
  // 引入mysql模块
  const mysql = require('mysql')
  // 创建连接数据库 填写数据库的连接信息
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'bigevent'
  })
  // 与数据库连接
  connection.connect()
  // 数据库中 增删查改语句 和 错误+结果输出的回调函数
  connection.query(sql, callback)
  // 结束语句
  connection.end()
}

// 将函数导出 以供在其他文件中使用  切记不可以加() 不是在此处调用 而是将函数暴露出去
// 且这是自己写的模块  在其他文件使用需要加 ./
module.exports = db