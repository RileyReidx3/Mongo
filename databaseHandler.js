const {MongoClient,ObjectId} = require('mongodb')
const DATABASE_URL = "mongodb+srv://RealKRipper:khanhpro0303@cluster0.uminl8z.mongodb.net/test"


async function insertNewProduct(newProduct) {
    let db = await getDB()
    let id = await db.collection("products").insertOne(newProduct)
    return id
}
async function getDB() {
    let client = await MongoClient.connect(DATABASE_URL)
    let db = client.db("GCH1003")
    return db
}

async function getAllProducts() {
    let db = await getDB()
    let results = await db.collection("products").find().toArray()
    return results
}
async function updateProduct(id, name, price, picUrl) {
    let db = await getDB()
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "picture": picUrl } })
}
async function findProductById(id) {
    let db = await getDB()
    const productToEdit = await db.collection('products').findOne({ _id: ObjectId(id) })
    return productToEdit
}
async function deleteProductById(id) {
    let db = await getDB()
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}
async function findProductByName(nameSearch){
    let db = await getDB()
    const result = await db.collection("products").find({name: new RegExp(nameSearch, 'i')}).toArray()
    console.log(nameSearch)
    console.log(result)
    return result;
}
module.exports = {findProductByName, insertNewProduct,getAllProducts,updateProduct,findProductById,deleteProductById }
