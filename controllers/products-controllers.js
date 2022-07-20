import Products from "../model/Products";

export const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Products.find();
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "No Products Found" });
  }
  return res.status(200).json({ products });
};

export const addProducts = async (req, res, next) => {
  const {
    itemCategory,
    itemName,
    itemPrice,
    mnfName,
    quantity,
    rating,
    itemUnit,
    itemDescription,
    image,
  } = req.body;

  const products = new Products({
    itemCategory,
    itemName,
    itemPrice,
    mnfName,
    quantity,
    rating,
    itemUnit,
    itemDescription,
    image,
  });
  try {
    await products.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ products });
};

export const updateProducts = async (req, res, next) => {
    const {
        itemCategory,
        itemName,
        itemPrice,
        mnfName,
        quantity,
        rating,
        itemUnit,
        itemDescription,
        image,
      } = req.body;
  const productId = req.params.id;
  let products;
  try {
    products = await Products.findByIdAndUpdate(productId, {
      itemCategory,
      itemName,
      itemPrice,
      mnfName,
      quantity,
      rating,
      itemUnit,
      itemDescription,
      image,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(500).json({ message: "Unable Update The Products" });
  }
  return res.status(200).json({ products });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let products;
  try {
    products = await Products.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "No Products Found" });
  }
  return res.status(200).json({ products });
};

export const deleteProducts = async (req, res, next) => {
  const id = req.params.id;
  let products;
  try {
    products = await Products.findByIdAndRemove(id).populate('user');
    await products.user.UserProducts.pull(products)
    await products.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "Product not Deleted" });
  }
  return res.status(200).json({ message: "Product Deleted Successfully" });
};
