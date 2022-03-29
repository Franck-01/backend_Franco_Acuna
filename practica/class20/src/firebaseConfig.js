const admin = require("firebase-admin")
const key_firebase = require("./key_firebase.json")

admin.initializeApp({
    credential: admin.credential.cert(key_firebase),
    databaseURL: "https://backend-2022-eco.firebaseio.com"
})

const CRUD = async() => {
    const db = admin.firestore()
    let batch = db.batch()
    const collection = db.collection("usuarios")

    //INSERTAR DE A UNO / INSERT ONE
    /*let doc = collection.doc()
    await doc.create({ name: "Franco", dni: 43390950 })*/

    //INSERTAR DE A VARIOS / INSERT MANY
    /*let users = [
        { name: "Mauricio", dni: 4352352 },
        { name: "Marisol", dni: 4352352 },
        { name: "Lila", dni: 4352352 },
        { name: "Edgar", dni: 4352352 },
        { name: "Mario", dni: 4352352 }
    ]
    users.forEach(doc => {
        let refDoc = collection.doc()
        batch.set(refDoc, doc)
    })
    await batch.commit()*/

    // TRAER / GET
    /*const snapShot = await collection.get()
    let docs = snapShot.docs
    let users = docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        dni: doc.data().dni
    }))
    console.log(users)*/

    // ALTERAR / UPDATE
    /*const doc = collection.doc(id)
    let result = await doc.update({ dni: 00000000 })*/

    //DELETE
    /*let id = "4uTCF94ZCYJQhT7Tl7T3"
    const doc = collection.doc(id)
    let result = await doc.delete()
    console.log(result)*/
}
CRUD()