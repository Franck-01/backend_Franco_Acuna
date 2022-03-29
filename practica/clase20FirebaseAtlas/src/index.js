import admin from 'firebase-admin';
import config from './firebase_key.json' assert {type: "json"};

let serviceAccount = config

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyectoprobadordeconexion.firebaseio.com"
});

const CRUD = async () =>{
  const db = admin.firestore();
  let batch = db.batch();
  const query = db.collection('usuarios')
  let users = [
    {name:"Mauricio",dni:4352352},
    {name:"Marisol",dni:4352352},
    {name:"Lila",dni:4352352},
    {name:"Edgar",dni:4352352},
    {name:"Mario",dni:4352352}
  ]
  // //CREATE ONE 
  // let doc = query.doc();
  // await doc.create({nombre:"Paps",dni:3556122})
  //CREATE MULTIPLE (requires batch)
  // users.forEach((doc) => {
  //     var docRef = db.collection("usuarios").doc(); //automatically generate unique id
  //     batch.set(docRef, doc);
  // });
  // await batch.commit();
  
  //GET ALL
  // try{
  //   const snapShot = await query.get();
  //   console.log(snapShot);
  //   let docs = snapShot.docs;
  //   console.log(docs);
  //   const response = docs.map(doc=>({
  //     id:doc.id,
  //     name:doc.data().name,
  //     dni:doc.data().dni
  //   }))
  //   console.log(response);
  // }catch(error){
  //   console.log(error);
  // }

  //GET BY ID
  // try{
  //   let id = "A3vWqabWqETD5kfvev0a"
  //   const doc = query.doc(id);
  //   const item =await  doc.get();
  //   const response = item.data()
  //   console.log(response);
  // }catch(error){
  //   console.log(error);
  // }

  /*UPDATE */
  // try{
  //   let id = "A3vWqabWqETD5kfvev0a";
  //   const doc = query.doc(id);
  //   let item = await doc.update({dni:555555555});
  //   console.log(item);
  // }catch(error){
  //   console.log(error);
  // }
}


CRUD();