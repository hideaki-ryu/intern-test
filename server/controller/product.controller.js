const dao = require("../dao/product.dao");
const t = require("../template/response.template");

module.exports = {
  getProduct: async (req, res) => {
    try {
      let rowCount, rows;

      if (req.query.withQty === "true")
        ({ rowCount, rows } = await dao.getProductWithQty(
          req.query.businessID
        ));
      else ({ rowCount, rows } = await dao.getProduct(req.query.businessID));

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  getProductParams: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getProductParams({
        productID: req.params.productID,
      });

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  postProduct: async (req, res) => {
    try {
      const { rows } = await dao.postProduct(req.body);

      t.res201payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const params = {
        ...req.body,
        productID: req.params.productID,
        userID: req.user.user_id,
      };

      const { rowCount, rows } = await dao.updateProduct(params);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const params = {
        productID: req.params.productID,
        userID: req.user.user_id,
      };

      const { rowCount, rows } = await dao.deleteProduct(params);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
};
