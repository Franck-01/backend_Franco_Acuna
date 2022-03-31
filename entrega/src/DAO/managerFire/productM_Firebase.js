const admin = require("firebase-admin")
const key_fb = require("../../../firebaseKey/backend-2022-eco-firebase-adminsdk-n5q2c-7ab2fcd4b4.json")
admin.initializeApp({
    credential: admin.credential.cert(key_fb),
    databaseURL: "https://backend-2022-eco.firebaseio.com"
})

const db = admin.firestore()
let batch = db.batch()
const order = db.collection("productos")

class productM_Firebase {
    Create = async(product) => {
        let ref_doc = order.doc()
        if (!product.name || !product.model || !product.price || !product.stock) return { status: "incomplete", error: "insufficient information" }
        await ref_doc.create(product)
        product.forEach(doc => {
            batch.set(ref_doc, doc)
        })
        await batch.commit()
        return { status: "success", message: "Product Created" }
    }
    Read = async() => {
        const snapShot = await order.get();
        let docs = snapShot.docs;
        let products = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            stock: doc.data().stock,
        }))
        return { status: "success", payload: products }
    }
    Update = async(id, body) => {
        const doc = order.doc(id)
        await doc.update(body)
        return { status: "success", message: "Product Update" }
    }
    Delete = async(id) => {
        const doc = order.doc(id)
        await doc.delete(body)
        return { status: "success", message: "Product Delete" }
    }
}

module.exports = productM_Firebase