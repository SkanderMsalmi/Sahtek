const Post = require("../../database/models/Post");
const Comment = require("../../database/models/Comment");

const Community = require("../../database/models/Community");
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
    async findPostByCommunity(_, { id }) {
      return await Post.find({ community: id });
    },






    async community(_, { id }) {
      return await Community.findById(id);
    },

    async getAllCommunities() {
      return await Community.find().sort({ $natural: -1 })
    },
    async findCommunityByUser(_, { id }) {
      return await Community.find({ members: ObjectId(id) });
    },


    async findPostByUserCommunities(_, { id }) {
       
      const list = await Community.find({ members: ObjectId(id) }).distinct(
        "_id"
      );
    
      return await Post.find({ community: { $in: list } });
    },

   

    

   




  },

  Mutation: {
    async createPost(_, { postInput: { description, user, title, community } }) {
      const createdPost = new Post({
        description: description,
        user: user,
        time: new Date(),
        like: [],
        likesCount: 0,
        commentsCount: 0,
        title: title,
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

          return await Post.findByIdAndUpdate(id, { $push: { like: user }}, { new: true })

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
        

          return await Post.findByIdAndUpdate(id, { $pull: { like: user } }, { new: true })

        }
      }
      if (!post) {
        throw new Error("post not found");

      }

    },














    async createCommunity(_, { name, description, creator }) {
      const createdCommunity = new Community({
        name: name,
        description: description,
        createdAt: new Date(),
        members: [],
        creator: creator,


      });
      const res = await createdCommunity.save();

      return res;
    },

    deleteCommunity: async (parent, args, context, info) => {
      const { id } = args;
      await Community.findByIdAndDelete(id)
      return "Community deleted";
    },

    updateCommunity: async (parent, args, context, info) => {
      const { id } = args;
      const { description } = args

      const community = await Community.findByIdAndUpdate(
        id,
        { description },
        { new: true }
      );
      return community;
    },

    joinCommunity: async (parent, args, context, info) => {
      const { id } = args;
      const { userId } = args;
      const community = await Community.findById(id);
      if (community) {
        if (!community.members.includes(userId)) {
          community.members.push(userId);
          return await community.save();

        } else
          throw new Error('You are already a member of this community');

      }
      if (!community) {
        throw new Error("Community not found");

      }
    },


   leaveCommunity: async (parent, args, context, info) => {
      const { id } = args;
      const { userId } = args;
      const community = await Community.findById(id);
     
      if (community) {
        if (community.members.includes(userId)) {
          community.members.pull(userId);
          return await community.save();

        } else
          throw new Error('You are not a member of this community');

      }
      if (!community) {
        throw new Error("Community not found");

      }
    },














  },
  Post: {

    user: async (parent, args) => {
      return await User.findById(parent.user);
    },
    community: async (parent, args) => {
      return await Community.findById(parent.community);
    },
    like: async (parent, args) => {
      let users = [];
      if (parent.like) {
        users = await User.find({ _id: { $in: parent.like } });
      } 
      return users;
    },
    comments: async (parent, args) => {
      return await Comment.find({ post: parent._id });
    },
   
    
     
    
    
    isLiked: async (post, { user }) => {

      // Check if the current user's ID is in the list of users who have liked the post
      return await post.like.includes(user);

    },

    isPostedByCurrentuser: async (post, { user }) => {

      return post.user.toString() === user;



    },



  },

  Community: {
    members: async (parent, args) => {
      return await User.find({ _id: { $in: parent.members } });
    },
    posts: async (parent, args) => {
      return await Post.find({ community: parent._id });
    }
  },
};

module.exports = resolvers;
