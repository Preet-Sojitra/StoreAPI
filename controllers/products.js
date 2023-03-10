const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
  // * All products
  // const products = await Product.find({})
  // * Products where "featured" is true
  // const products = await Product.find({featured: true})
  // * Products where name is "vase table"
  // const products = await Product.find({ name: "vase table" })

  // * search with regex
  // * "i" is for case insensitive
  // const search = "a"
  // const products = await Product.find({name: {$regex: search, $options: "i"}})

  // * sorting ascendingly
  // const products = await Product.find({}).sort("name")
  // * sorting descendingly
  // const products = await Product.find({}).sort("-name")
  // * sorting on name and price
  // * How this work is first of all , all names will be sorted in descending order and in side that suppose if two objects have same name then they will be sorted with price in ascending order
  // const products = await Product.find({}).sort("-name price")

  // * selecting only few properties from the object. It will select only "name" and "price"
  // const products = await Product.find({}).select("name price")

  // * limiting to get only fewer number of results. Will get only 4 results
  // const products = await Product.find({}).select("name price").limit(4)

  // * skip will skip the first results. Here it will skip first 2 results
  // const products = await Product.find({})
  //   .sort("name")
  //   .select("name price")
  //   .limit(10)
  //   .skip(2)

  // * Numeric Filters : Find price > 100
  const products = await Product.find({price: {$gt: 100}})
    .sort("name")
    .select("name price")
  return res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
  // console.log(req.query)
  const {featured, company, name, sort, fields, numericFilters} = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === "true" ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = {$regex: name, $options: "i"}
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    }
    // regEx from stackoverflow :)
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ["price", "rating"]
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-") // This will split single item into 3 parts.
      if (options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
      }
    })
    // console.log(filters)
  }
  // console.log(queryObject)
  let result = Product.find(queryObject)
  // sorting
  if (sort) {
    // console.log(sort)
    const sortList = sort.split(",").join(" ")
    // console.log(sortList)
    result = result.sort(sortList)
  } else {
    result = result.sort("createdAt")
  }

  // selecting only few keys
  if (fields) {
    const fieldsList = fields.split(",").join(" ")
    result = result.select(fieldsList)
  }

  // paging
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result
  return res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProductsStatic, getAllProducts}
