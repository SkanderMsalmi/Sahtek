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


     



  },

  Mutation: {
    async createPost(_, { postInput: { description, user, title, community } }) {
      const createdPost = new Post({
        description: description,
        user: user,
        time: new Date().toDateString(),
        like: [],
        likesCount: 0,
        commentsCount: 0,
        title:title, 
        community: community,
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
      if (post) {
        const u = await post.like.includes(user)
        if (!u) {
          const likes = post.like || [];
          const num = likes.length;

          return await Post.findByIdAndUpdate(id, { $push: { like: user }, likesCount: num + 1 }, { new: true })

        }
      }
      if (!post) {
        throw new Error("post not found");

      }
    },


    removeLikePost: async (parent, args, context, info) => {
      const { id } = args;
      const { user } = args;
      const post = await Post.findById(id);
      if (post) {
        const u = await post.like.includes(user)
        if (u) {
          const likes = post.like || [];
          const num = likes.length;

          return await Post.findByIdAndUpdate(id, { $pull: { like: user }, likesCount: num - 1 }, { new: true })

        }
      }
      if (!post) {
        throw new Error("post not found");

      }

    },






  },
  Post: {

    user: async (parent, args) => {
      return await User.findById(parent.user);
    },

    isLiked: async (post, { user }) => {
      console.log(user);
      // Check if the current user's ID is in the list of users who have liked the post
      return await post.like.includes(user);
      
    },
    
    isPostedByCurrentuser: async (post, { user }) => {

      return post.user.toString() === user;

       
      
    },



  },
};

module.exports = resolvers;
