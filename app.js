/*
  后端应用的启动模块
  1.通过express启动服务
  2.通过mongoose连接数据库
    只有当数据库连接成功才能够启动服务
  3.使用中间件
 */
const express = require("express")
const mongoose = require("mongoose")
var bodyParser = require("body-parser")
const path = require("path")
const app  = express()
// 使用中间件
app.use(express.static("public"))
// parse application/x-www-form-urlencoded  用中间件防止报错
app.use(bodyParser.urlencoded({extended:false}))
// parse application/json
app.use(bodyParser.json())
// 开放node_modules路径   路由请求路径不能加点
app.use("/node_modules",express.static(path.join(__dirname,"./node_modules")))
// 引入路由器中间件文件
const indexRouter  = require("./routes")
app.use("/",indexRouter)
// 通过mongoose连接数据库  本地地址/数据库名字
mongoose.connect("mongodb://localhost/b0364sms_server",{useNewUrlParser:true}).then(()=>{
    console.log("数据库连接成功了");
    // 设置端口号
    app.listen("3000",()=>{
        console.log("服务器启动成功,请访问http://localhost:3000");
    })
}).catch(error=>{
    console.log("数据库连接失败",error);
})