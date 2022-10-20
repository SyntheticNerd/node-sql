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
    // The method of using the question marks and then passing the data in with the second fields
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

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  //! BUG this is the method called to get the individual product from the db
  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static update(
    id,
    { updatedTitle, updatedImageUrl, updatedDesc, updatedPrice }
  ) {
    return db.execute(
      "UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ?, updatedAt = ? WHERE products.id = ?",
      [updatedTitle, updatedPrice, updatedImageUrl, updatedDesc, new Date(), id]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }

};
