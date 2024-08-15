// 引入express
const express = require("express")
//这个组件用于接收post数据
const bodyParser = require("body-parser")
var jwt = require("jsonwebtoken")
// 创建服务器对象
const app = express()
const mysql = require("mysql")
const conn = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "root",
	database: "react-pro",
	multipleStatements: true,
})
 
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json({ type: "application/*+json" }))
//解决跨域
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Content-Type")
	res.header("Access-Control-Allow-Methods", "*")
	res.header("Content-Type", "application/json;charset=utf-8")
	next()
})
 
app.post("/login", (req, res) => {
	var userName = req.body.userName
	var password = req.body.password
	if (!userName || !password) {
		res.send({
			code: 0,
			msg: "用户名与密码为必传参数...",
		})
		return
	}
	const sqlStr = "select * from user WHERE userName=? AND password=?"
	conn.query(sqlStr, [userName, password], (err, result) => {
		if (err) throw err
		if (result.length > 0) {
			// 生成token
			var token = jwt.sign(
				{
					identity: result[0].identity,
					userName: result[0].userName,
				},
				"secret",
				{ expiresIn: "1h" },
			)
			console.log(token)
			res.send({ code: 1, msg: "登录成功", token: token })
 
			// 如果没有登录成功，则返回登录失败
		} else {
			// 判断token
			if (req.headers.authorization == undefined || req.headers.authorization == null) {
				if (req.headers.authorization) {
					var token = req.headers.authorization.split(" ")[1] // 获取token
				}
				jwt.verify(token, "secret", (err, decode) => {
					if (err) {
						res.send({ code: 0, msg: "登录失败" })
					}
				})
			}
		}
	})
})
 
//post请求
app.post("/register", (req, res) => {
	var userName = req.body.userName
	var password = req.body.password
	if (!userName || !password) {
		res.send({
			code: 0,
			msg: "用户名与密码为必传参数...",
		})
		return
	}
	if (userName && password) {
		const result = `SELECT * FROM user WHERE userName = '${userName}'`
		conn.query(result, [userName], (err, results) => {
			if (err) throw err
			if (results.length >= 1) {
				//2、如果有相同用户名，则注册失败，用户名重复
				res.send({ code: 0, msg: "注册失败，用户名重复" })
			} else {
				const sqlStr = "insert into user(userName,password) values(?,?)"
				conn.query(sqlStr, [userName, password], (err, results) => {
					if (err) throw err
					if (results.affectedRows === 1) {
						res.send({ code: 1, msg: "注册成功" })
					} else {
						res.send({ code: 0, msg: "注册失败" })
					}
				})
			}
		})
	}
 
	console.log("接收", req.body)
})
 
//开启监听
app.listen(4000, () => {
	console.log("4000端口已经启动。。。")
})