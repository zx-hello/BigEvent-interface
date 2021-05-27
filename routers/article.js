const express = require('express')
// 创建路由对象(本质是函数)
const router = express.Router()
// 导出router
module.exports = router

const db = require('../db')
const jwt = require('jsonwebtoken')