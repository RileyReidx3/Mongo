const { urlencoded } = require('express')
var express = require('express')
const {findProductByName, insertNewProduct,getAllProducts,postEditProduct, getEditProduct,findProductById,deleteProductById }
= require('./databaseHandler')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await deleteProductById(id)
    res.redirect('/all')
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const productToEdit = await getEditProduct(id)
    res.render("edit",{product:productToEdit})
})

app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picUrl = req.body.txtPic
    await postEditProduct(id, name, price, picUrl)
    res.redirect('/all')
})

app.get('/all',async (req,res)=>{
    let results = await getAllProducts()
    console.log(results)
    res.render('allProduct',{results:results})
})

app.post('/new',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picUrl = req.body.txtPic
    const newProduct = {
        name :name,
        price: Number.parseFloat(price),
        picture: picUrl
    }
    await insertNewProduct(newProduct)
    res.redirect('/all')

})

const PORT = 3000
app.listen(PORT)
console.log("Server is running!")