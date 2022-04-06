import express from "express"
import UserMock from "../mocks/userMock.js"

const router = express.Router()
const usersMock = new UserMock

router.post("/show", (req, res) => {
    let result = usersMock.popular(100)
    res.send(result)
})
router.get("/", (req, res) => {
    res.send(usersMock.listarAll())
})

export default router