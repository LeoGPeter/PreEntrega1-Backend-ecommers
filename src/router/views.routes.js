import  express  from "express";
import ProductManager from "../controllers/ProductManager.js";
import __dirname from "../utils.js";

const router = express.Router();
const product = new ProductManager();

router.get("/", async (req , res) => {
    let allProducts = await product.getProducts()
    res.render("home",{
       titles: "Express Avanzado / handlebars",
       products: allProducts
    })
})

router.get("/chat", (req, res) => {
    res.render("chat")
  });

export default router