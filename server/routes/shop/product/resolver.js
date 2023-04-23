
const Product = require("../../../database/models/product");
const { readFile, readProduct } = require("../../../utils/uploadFile");
const csvToJson = require('csvtojson');

const csvFilePath = `${__dirname}/../../../amazonProds.csv`;




// const jsonString = JSON.stringify(json, null, 2)

const resolvers = {
  Query: {
    async getProduct(_, { ID }) {
      return await Product.findById(ID);
    },

    async getAllProducts() {
      return await Product.find();
    },
    async getCategories() {
      return await Product.distinct("category");
    },
    async getAmazonProducts() {
      const json = await csvToJson().fromFile(csvFilePath);

      const jsonString = JSON.stringify(json, null, 2);
      return jsonString;
    }
  },

  Mutation: {
    async addProduct(
      _,
      { productInput: { name, category, description, price, stock }, image }
    ) {
      img = await readProduct(image);
      const createdProduct = new Product({
        name: name,
        category: category,
        description: description,
        price: price,
        stock: stock,
        image: img,
      });
      const res = await createdProduct.save();
    },

    deleteProduct: async (parent, args, context, info) => {
      const { id } = args;
      await Product.findByIdAndDelete(id);
      return "Product deleted";
    },

    updateProduct: async (
      parent,
      {
        productInput: { id, name, description, category, stock, price, image },
        img,
      },
      context,
      info
    ) => {
      if (!id) {
        const createdProduct = new Product({
          name: name,
          category: category,
          description: description,
          price: price,
          stock: stock,
          image: img,
        });
        const res = await createdProduct.save();

        return res;
      }
      if (img) image = await readProduct(img);

      const product = await Product.findByIdAndUpdate(
        id,
        { name, description, category, stock, price, image },
        { new: true }
      );
      return product;
    },
  },
};

module.exports = resolvers;
