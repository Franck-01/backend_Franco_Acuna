var express = require("express");
var router = express.Router();

let products = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// tengo que definir squemas
// estamos programando en un formato yml
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - id
 *        - title
 *        - price
 *      properties:
 *        id:
 *          type: string
 *          description: Este id se autogenera para cada producto
 *        title:
 *          type: string
 *          description: Este es el nombre del producto
 *        price:
 *          type: number
 *          description: Este es el precio del producto
 *      example:
 *          id: 2323422342
 *          description: laptop
 *          price: 1234
 *  */

/**
 * @swagger
 * /pr:
 *  get:
 *    summary: gets every products available
 *    tags:
 *      - Products
 *    responses:
 *      "200":
 *        description: Every products available
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 * */

router.get("/pr", function (req, res, next) {
  res.json({ title: products });
});
router.get("/pr/:id", function (req, res, next) {
  let { id } = req.params;
  const elem = products.find((item) => {
    return item.id == id;
  });

  if (!elem) {
    res.render("index", { title: "No se esncontro el producto" });
  }
  res.json({ title: elem });
});

// POST

/**
 * @swagger
 * /pr:
 *  post:
 *    summary: post create products
 *    tags:
 *      - Products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      "200":
 *        description: products created
 *        content:
 *          application/json:
 *            schema:
 *              items:
 *                $ref: '#/components/schemas/Product'
 * */
router.post("/pr", (req, res) => {
  let elem = req.body;
  elem.id = Math.random();

  products.push(elem);
  res.json({ message: "Saved", data: elem });
});

module.exports = router;