const Comment = require("../../database/models/Comment");
const Post = require("../../database/models/Post");
const { User } = require("../../database/models/User");
const resolvers = {
  Query: {
    async getPost(_, { id }) {
      return await Post.findById(id);
    },

    async getAllPosts() {
      return await Post.find();
    },
    async findPostByUser(_, { id }) {
      return await Post.find({ user: id });
    },
    
  },

  Mutation: {
    async createPost(_, { postInput: { description, user } }) {
      const createdPost = new Post({
        description: description,
        user: user,
        time: new Date().toDateString(),
        like: 0,
        commentsCount: 0,
      });
      const res = await createdPost.save();

      return res;
    },

    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Post deleted";
    },

    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { description } = args.postInput;
      const post = await Post.findByIdAndUpdate(
        id,
        { description },
        { new: true }
      );
      return post;
    },

    LikePost: async (parent, args, context, info) => {
      const { id } = args;
      return  await Post.findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true });

    },
  },
  Post: {
    
    user: async (parent, args) => {
      return await User.findById(parent.user);
    },
  },
};

module.exports = resolvers;
