const { logConsole, logWarn } = require("../services/users.services.js")
const {productDAO, cartDAO} = require("../DAOS/index")
const {Server} = require("socket.io")

const io = new Server(server)

io.on("connection", async socket => {
    logConsole.info("new user")

    let products = await productDAO.get()
    io.emit("products", products)
    
    socket.on("createCart", async data => {
        let newCart = await cartDAO.new()
        let cartID = newCart.payload[0]._id
        io.emit("cartCreated", { cart: newCart })
        socket.on("addProductToCart", async idProd => {
            await cartDAO.add(cartID, idProd)
            let cart = await cartDAO.get(cartID)
            let prodInCartIds = cart.payload[0].products
            
            let prodInCart = []
            socket.emit("refreshCart", prodInCart)
            for (let i = 0; i < prodInCartIds.length; i++) {
                const id = prodInCartIds[i];
                let product = await productServices.getById(id)
                
                prodInCart.push(product.payload[0])
                product = []
            }
            socket.emit("refreshCart", prodInCart)
        })
        socket.on('finishPurchase', async data => {
            logConsole.info(data)

            let articulosPedido = ''
            let articulosPedidoWapp = ''
            for (let i = 0; i < data.length - 1; i++) {
                const articulo = data[i];
                articulosPedidoWapp = articulosPedidoWapp + `
                name: ${articulo.name}
                price: ${articulo.price}
                id: ${articulo.id}

                `
                articulosPedido = articulosPedido + `<ul><li>name: ${articulo.name}</li><li>price: ${articulo.price}</li><li>id: ${articulo.id}</li></ul><br>`
            }


            const mailOptions2 = {
                from: 'servidor de node js',
                to: TEST_MAIL,
                subject: `nuevo pedido de ${data[data.length - 1].user} , email ${data[data.length - 1].email} `,
                html: `lista de pedido:<br> ${articulosPedido}`
            }
        
            try {
                const info = await transporter.sendMail(mailOptions2)
                logConsole.info(info)

                const message = await client.messages.create({
                    body: 'pedido recibido y en estado de procesamiento',
                    from: '+5491121899785',
                    to: data[data.length - 1].phone
                })
                logConsole.info(message)

                const whatsapp = await client.messages.create({
                    body: `nuevo pedido de ${data[data.length - 1].user} , email ${data[data.length - 1].email}
                     ${articulosPedidoWapp}`,
                    from: 'whatsapp:' + '+5491121899785',
                    to: 'whatsapp:' + data[data.length - 1].phone
                })
                logConsole.info(whatsapp)

            } catch (err) {
                logWarn.error(err)
                logConsole.error(err)
            }

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                await cartDAO.deleteProd(cartID, element.id)
            }
        })
    })
})

module.exports= io