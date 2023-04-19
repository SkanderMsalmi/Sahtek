const Product = require('../../../database/models/product');
const { readFile, readProduct } = require('../../../utils/uploadFile');

const resolvers = {
    Query: {
        async getProduct(_, { ID }) {
            return await Product.findById(ID)
        },

        async getAllProducts() {
            return await Product.find();
        }
    },

    Mutation: {

        async addProduct(_, { productInput: { name, category, description, price, stock }, image }) {
            img = await readProduct(image);
            const createdProduct = new Product({
                name: name,
                category: category,
                description: description,
                price: price,
                stock: stock,
                image: img


            })
            const res = await createdProduct.save();

            return res

        },


        deleteProduct: async (parent, args, context, info) => {
            const { id } = args
            await Product.findByIdAndDelete(id)
            return "Product deleted";
        },

        updateProduct: async (parent, { productInput: { id, name, description, category, stock, price, image }, img }, context, info) => {
            if (!id) {
                const createdProduct = new Product({
                    name: name,
                    category: category,
                    description: description,
                    price: price,
                    stock: stock,
                    image: img


                })
                const res = await createdProduct.save();

                return res
            }
            if (img)
                image = await readProduct(img);

            const product = await Product.findByIdAndUpdate(
                id, { name, description, category, stock, price, image }, { new: true }

            );
            return product
        },



    }

}

module.exports = resolvers;
