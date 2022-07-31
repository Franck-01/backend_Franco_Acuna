const { logConsole, logWarn, logError } = require("../services/users.services.js")
//const {EMAIL, transporter} = require("../messages/messages.js")

const getHome = async(req, res) => {
    res.render("index.ejs",{prueba:0})
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getLogin = async(req, res) => {
    if (req.isAuthenticated()) return res.redirect('/profile')
    res.render('login.ejs')
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getSignup = async(req, res) => {
    if (req.isAuthenticated()) return res.redirect('/profile')
    res.render('signup.ejs')
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getProfile = async(req, res) => {
    res.render("profile.ejs", { user: req.session.passport.user.username })
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getLogout = async(req, res) => {
    if(req.isAuthenticated()) {
        req.logout((err) => { if (err) return next(err) })
        res.render('logout.ejs')
    } else {
        res.redirect('/')
    }
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`) 
}

const getUserExist = async(req, res) => {
    res.render("userExists.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getInvalidPassword = async(req, res) => {
    res.render("invalidPass.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const postSignup = async (req, res, next) => {
    /*const mailOptions = {
    from: "FROM SERVER",
    to: 'chad.reynolds79@ethereal.email',
    subject: "Aviso de nuevo usuario ingresado",
    html: `<div class="card" style="width: 18rem;">
        <img src="https://i.ytimg.com/vi/mJZsXTv-N9k/maxresdefault.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="cadr-title">Nuevo Usuario</h5>
            <p class="btn btn-primary">nombre:${req.body.name}</p>
            <p class="btn btn-primary">usuario: ${req.body.username}</p>
            <p class="btn btn-primary">email: ${req.body.email}</p>
            <p class="btn btn-primary">age: ${req.body.age}</p>
            <p class="btn btn-primary">phone: ${req.body.phone}</p>
            </div>
        </div>`
        }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        logConsole.info(info)
    } catch (error) {
        logError.error(error)
        logConsole.error(error)        
    }*/
    res.redirect('/profile')

    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const postLogin = async(req, res) => {
    res.redirect('/profile')
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getWrong = async(req, res) => {
    logConsole.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
    logWarn.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getNav = async (req, res) => {
    res.render("nav.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
module.exports={ getHome, getNav, getInvalidPassword, getLogin, getLogout, getProfile, getSignup, getUserExist, getWrong, postLogin, postSignup }