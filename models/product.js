const Cart = require("./cart");
const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.date = new Date();
  }

  save() {
    //* This is the magic sauce

    // Capitol words are SQL specific they don't have to be capital but its a clear indicator of which text is which.
    // So this is going to INSERT or add a product with a title, price,... INTO a tables called products, with the
    // specified VALUES.
    //! ORDER MATTERS

    //? If the table does not exist it will throw an error... I think

    // The method of using the question marks and then passing the data in with the second field (values)
    // of the execute method is added security to prevent sql injection
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.title,
        this.price,
        this.imageUrl,
        this.description,
        this.date,
        this.date,
      ]
    );
  }

  // The * means everything, so we are SELECTing or retrieving everything FROM a table called products
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  // This is how we SELECT an individual product FROM all(*) the items/rows in the products table; we check WHERE/if
  // the id matches a specified id and only return/SELECT that product/products, returns an array of
  // all the products it matches which should be of size 1. Its like Array.filter
  //* Works for admin
  //! BUG this is the method called to get the individual product from the db
  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  // This method expects two items an id and an updateObject
  // The UPDATE method from SQL has us UPDATE the whole table, SETing individual fields/columns
  // then at the end we specify for which/WHERE rows/items/product we want to update
  static update(
    id,
    { updatedTitle, updatedImageUrl, updatedDesc, updatedPrice }
  ) {
    return db.execute(
      "UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ?, updatedAt = ? WHERE products.id = ?",
      [updatedTitle, updatedPrice, updatedImageUrl, updatedDesc, new Date(), id]
    );
  }
  // This one is incredible straight forward, expects an id then DELETEs a item/row FROM the table
  // products if/WHERE the rows id matches the specified id
  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }
};

//How we can execute a command using a SQL string
// Because we used promise when we exported the pool these execute queries will no return promises
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result[0]);
//   })
//   .catch((err) => console.log(err));
