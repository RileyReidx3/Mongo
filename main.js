var express = require('express')
var app = express()
var fs = require('fs')

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = 3000
app.listen(PORT)
console.log("Server is running!")