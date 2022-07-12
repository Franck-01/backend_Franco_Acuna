const Router = require("koa-router")

const router = new Router({
    prefix:"/books",
})

const books = [
    {
        id:1,
        name: "Name 1",
        description:"description 1"
    },
    {
        id:2,
        name: "Name 2",
        description:"description 2"
    }
]
router.get("/",(ctx)=>{
    ctx.body ={
        status:"success",
        data:books,
    }
})

//EJEMPLO MUY BASICO DE UN CRUD
router.get("/id",(ctx)=>{
    const {id} =ctx.params
    const book = books.filter((book)=>{
        if (book.id.toString()===id.toString()) return book
    })
    if (book.length >0){
        ctx.body={
            status:"succes",
            data:book[0],
        }
    } else {
        ctx.body ={
            status: "error",
            data: null,
        }
    }
})
router.post("/",(ctx)=>{
    const {body} = ctx.request
    books.push(body)
    ctx.body = {
        status:"success",
        data:books,
    }
})
module.exports=router