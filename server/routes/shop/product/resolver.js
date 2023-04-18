const Product = require("../../../database/models/product");

const resolvers = {
  Query: {
    async getProduct(_, { ID }) {
      return await Product.findById(ID);
    },

    async getAllProducts() {
      return await Product.find();
    },
    async getCategories() {
      return (await Product.find({}, { category: 1, _id: 0 })).map(
        (item) => item.category
      );
    },
  },

  Mutation: {
    async addProduct(
      _,
      { productInput: { name, category, description, price, stock } }
    ) {
      const createdProduct = new Product({
        name: name,
        category: category,
        description: description,
        price: price,
        stock: stock,
      });
      const res = await createdProduct.save();

      return res;
    },

    deleteProduct: async (parent, args, context, info) => {
      const { id } = args;
      await Product.findByIdAndDelete(id);
      return "Product deleted";
    },

    updateProduct: async (parent, args, context, info) => {
      const { id } = args;
      const { stock } = args.productInput;
      const product = await Product.findByIdAndUpdate(
        id,
        { stock },
        { new: true }
      );
      return product;
    },
  },
};

module.exports = resolvers;
