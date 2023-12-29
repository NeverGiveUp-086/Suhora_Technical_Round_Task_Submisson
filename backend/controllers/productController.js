const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  remove,
} = require("firebase/database");
const ErrorHandler = require("../utils/errorHandler");

const db = getDatabase();

//create new product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, stocks, category } = req.body;

  // Store product data in Firebase Realtime Database
  const productData = {
    name,
    description,
    price,
    stocks,
    category,
  };
  const newProductRef = push(ref(db, "products"));
  //also set the product id as the key
  const data = set(newProductRef, productData);
  console.log("data", data);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    productData,
  });
});

//get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  // Read product data from Firebase Realtime Database
  const productsRef = ref(db, "products");
  const snapshot = await get(productsRef);
  const products = snapshot.val();
  //loop through each prodcut and set the id as the key
  Object.keys(products).forEach((key) => {
    products[key].id = key;
  });

  const productList = Object.values(products);
  console.log("productList", productList);

  res.status(200).json({
    success: true,
    productList,
  });
});

//get product by id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  // Read product data from Firebase Realtime Database
  const productRef = ref(db, `products/${productId}`);
  const snapshot = await get(productRef);
  const product = snapshot.val();
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product.id = productId;

  res.status(200).json({
    success: true,
    product,
  });
});

//update product details
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, price, stocks, category } = req.body;
    const productId = req.params.id;
    const db = getDatabase();
    const productRef = ref(db, `products/${productId}`);

    if(!productRef){
      return next(new ErrorHandler("Product not found", 404));
    }

    // Update product data in Firebase Realtime Database
    const productData = {};
    if (name) productData.name = name;
    if (description) productData.description = description;
    if (price) productData.price = price;
    if (stocks) productData.stocks = stocks;
    if (category) productData.category = category;

    await update(productRef, productData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      productData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    // Delete product from Firebase Realtime Database
    const db = getDatabase();
    const productRef = ref(db, `products/${productId}`);
    if(!productRef){
      return next(new ErrorHandler("Product not found", 404));
    }

    await remove(productRef);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
});
