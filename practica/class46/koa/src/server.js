const koa = require("koa")
const dotenv = require("dotenv")
const koaBody = require("koa-body")
const booksRouter = require("./router/books.router.js")

dotenv.config()

const app = new koa()
app.use(koaBody())

app.use(booksRouter.routes())

app.use(async(ctx)=>{
    ctx.body="Hello KOA"
})

const PORT = process.env.PORT ||3000
const server = app.listen(PORT,()=>{
    console.log(`Server run on PORT: ${PORT}`)
})
server.on("Error",(err)=>{
    console.log(err)
})