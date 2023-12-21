const Product = require("../models/products");

const getAllProducts = async (req, res, next) => {
  const { company, search, sort, fields } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (company) {
    queryObject.company = company;
  }

  let result = Product.find(queryObject);

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit)
  
  try {
    const products = await result;
    res.json({ products });
  } catch (error) {
    next(error)
  }
};

const getSingleProduct = async (req, res, next) => {
  res.send("get single product")
};

module.exports = {
  getAllProducts,
  getSingleProduct,
};
