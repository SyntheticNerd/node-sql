const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

//* Each of these router methods specify what operation we want to perform given the specified route.method
//router is a method provided by express and we can call methods like get, post, delete, patch, or put
//on the router, this will pre-configure headers for us.

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product/<%= id %> => GET
//* SAME but works
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/edit-product => POST (id, updateObject)
router.patch("/edit-product", adminController.postEditProduct);

// /admin//delete-product => POST (id)
router.delete("/delete-product", adminController.postDeleteProduct);

//* FROM HERE TO UNDERSTAND MORE CHECKOUT THE controllers/admin.js FILE

module.exports = router;
