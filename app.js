const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
require('dotenv').config()

const serverless = require('serverless-http');

const app = express()
const port = 3000

app.set('view engine', 'ejs') // view 엔진으로 ejs를 사용할 것
app.set('views', './views') // view 파일들은 root/views에 생성할 것

app.use(express.static(__dirname + '/public')) // 정적 파일을 위해 express.static을 사용할 것, __dirname 은 현재 실행하는 파일의 절대경로

app.use(bodyParser.urlencoded({extended: false})) // Body-parser


// Root URL('/') 경로에 대한 GET 요청, HTML 페이지(searchRecipe.ejs) 반환
app.get('/', (req, res) => {
    res.render('searchRecipe')
})

// URL('/login') 경로에 대한 GET 요청, HTML 페이지(login.ejs) 반환
app.get('/login', (req, res) => {
    res.render('login')
})

// URL('/register') 경로에 대한 GET 요청, HTML 페이지(register.ejs) 반환
app.get('/register', (req, res) => {
    res.render('register')
})

// URL('/mypage') 경로에 대한 GET 요청, HTML 페이지(mypage.ejs) 반환
app.get('/mypage', (req, res) => {
    res.render('mypage')
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//  })
  
module.exports.handler = serverless(app);