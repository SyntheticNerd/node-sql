# How to Use

1. To use application first clone repository.
2. In the your console in, making sure to be in the right file directory, run `npm i`.
3. One node modules has installed the dependencies enter `npm start`

4. Finally you will need to visit [LocalHost:3000](http://localhost:3000/) to view the site.

To test functionality navigate to [Add product](http://localhost:3000/admin/add-product), make sure to provide all the values, I am not checking to make sure you do.

- You must provide a string for the image but it does not have to be a valid img url.

Navigate to the [Admin Products page](http://localhost:3000/admin/products)

- Here we have access to edit or delete our products.
  - [Edit](http://localhost:3000/admin/edit-product/1?edit=true): Will allow you to update a product.
  - Delete: Well you guessed it, ==try not to delete my test products please==.

## Code review

1.  Start with the app.js in there we set up the express server and middleware.

    ```js
    const express = require("express");
    const bodyParser = require("body-parser");

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(...);
    app.listen(3000);
    ```

2.  Checkout the utils/database.js to see how the SQL database is configured.

    ```js
    const mysql = require("mysql2");

    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      database: "node-complete",
      password: "*********",
    });
    module.exports = pool.promise();
    ```

3.  Next the routes/admin.js this is where we delegate different tasks based on the http request method and route. These tasks are defined in the controller.

    ```js
    const express = require("express");

    const router = express.Router();

    router.get("/products", adminController.getProducts);
    router.post("/add-product", adminController.postAddProduct);
    router.patch("/edit-product", adminController.postEditProduct);
    router.delete("/delete-product", adminController.postDeleteProduct);

    module.exports = router;
    ```

4.  In the controller/admin.js we see a midway point that will arrange different requests/data and depending on the responses render a view to the screen or make changes to the database.

    ```js
    const Product = require("../models/product");

    exports.postEditProduct = (req, res, next) => {
      const prodId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedPrice = req.body.price;
      const updatedImageUrl = req.body.imageUrl;
      const updatedDesc = req.body.description;
      // update is a static method that wants an id and an object specifying which fields should be updated
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
    ```

5.  Lastly the place where the SQL magic happens is in the models/product.js file.

    - This file contains a class object responsible for managing and creating products through a series of SQL command executions.

    ```js
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
    };
    ```
