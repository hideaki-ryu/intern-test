const dao = require("../dao/product.dao");
const t = require("../template/response.template");

module.exports = {
  getProduct: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getProduct(req.body.businessID);

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
        businessID: req.body.businessID
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
        businessID: req.body.businessID,
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
        businessID: req.body.businessID,
      };

      const { rowCount, rows } = await dao.deleteProduct(params);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
};
