const Comment = require("../../database/models/Comment");
const Post = require("../../database/models/Post");
const { User } = require("../../database/models/User");
const { MongoClient, ObjectId } = require('mongodb');

const resolvers = {
  Query: {
    async getPost(_, { id }) {
      return await Post.findById(id);
    },

    async getAllPosts() {
      return await Post.find().sort({ $natural: -1 })
    },
    async findPostByUser(_, { id }) {
      return await Post.find({ user: id });
    },


    async isLiked(_, { id, user }) {
      const liked = await Post.findOne({ _id: ObjectId(id), like: { $in: [user] } });
      if(liked !== null){
        return true
      } else{
        return false
      }    
 
    },



  },

  Mutation: {
    async createPost(_, { postInput: { description, user } }) {
      const createdPost = new Post({
        description: description,
        user: user,
        time: new Date().toDateString(),
        like: [],
        likesCount: 0,
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
      const { user } = args;
      const post = await Post.findById(id);
      await post.update({ $push: { like: user } }, { new: true });

      const likes = post.like || [];
      const num = likes.length;

      return await Post.findByIdAndUpdate(id, { likesCount: num + 1 }, { new: true })




    },
  },
  Post: {

    user: async (parent, args) => {
      return await User.findById(parent.user);
    },

  },
};

module.exports = resolvers;
