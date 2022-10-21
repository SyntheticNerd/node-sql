const Product = require("../models/product");


// Gets all the products from the database and passes them to the rendered view for all products
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

// Renders a view for editing 1 product
// This one view actually handles adding new products as well as editing old ones
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// Add a product to the database and redirects users to the home screen.
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // create a product using the class defined in models
  const product = new Product(null, title, imageUrl, description, price);

  // with a new product created I made a method in the class called save
  // that saves the new product to the db
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

// Gets a product given an id and Renders a view for editing a single product
//* SAME but works
let increment = 1;
exports.getEditProduct = (req, res, next) => {
  console.log("ADMIN TIMES RAN", increment);
  increment++;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  console.log("PRODUCT ID", prodId);
  // findById is a static method I created on Product, that returns a product
  // given a valid id I then pass the product info to the view
  Product.findById(prodId)
    .then(([[product]]) => {
      // console.log(product);
      // console.log(product[0]);
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        product: product,
        editing: editMode,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Constructs an update object Edits a product on the database given an id
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // update is a static method that watch an id and an object specifying
  // which fields should be updated
  Product.update(prodId, {
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice,
  })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// Deletes a product given an id
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  //Same story here you will see in the model delete is a lot like findById actually
  Product.deleteById(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

//* FROM HERE TO UNDERSTAND MORE CHECKOUT THE models/product.js FILE
