const natural = require('natural');
const Post = require("../../database/models/Post");
const Comment = require("../../database/models/Comment");
const Community = require("../../database/models/Community");
const { User } = require("../../database/models/User");
const { MongoClient, ObjectId } = require('mongodb');

const { spawn } = require('child_process');


// function getMostSimilarQuestions(newQuestion, existingQuestions) {
//   return new Promise((resolve, reject) => {
//     const pythonProcess = spawn('python', ['utils/similar_questions.py', newQuestion, ...existingQuestions]);
//     let result = '';

//     pythonProcess.stdout.on('data', function (data) {
//       result = data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       reject(data.toString());
//       console.log(`stderr: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//       console.log(`Python process ended with code: ${code}`);
//       console.log(`Python script output: ${result}`);

//       if (code !== 0) {
//         reject(`Python process exited with code ${code}`);
//       } else {
//         try {
//           const similarQuestions = result.trim().split('\n');
//           resolve(similarQuestions);
//         } catch (err) {
//           reject(err);
//         }
//       }
//     });
//   });
// }




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

    async similarQuestions(_, { newQuestion }) {
      function calculateQuestionSimilarity(question1, question2) {
        const maxLength = Math.max(question1.length, question2.length);
        const levenshtein = natural.LevenshteinDistance;
        const distance = levenshtein(question1, question2);
        const similarity = 1 - (distance / maxLength);
        return similarity;
      }

      const existingQuestions = await Post.find().distinct("title");

      const similarQuestions = existingQuestions
        .map((existingQuestion) => {
          const similarity = calculateQuestionSimilarity(newQuestion, existingQuestion);
          return {
            title: existingQuestion,
            similarity: similarity
          };
        })
        .filter((question) => question.similarity >= 0.6);

      similarQuestions.sort((a, b) => b.similarity - a.similarity); ///// sort by similarity in descending order

      return similarQuestions;
    },

    async findPostByUserCommunities(_, { id }) {

      const list = await Community.find({ members: ObjectId(id) }).distinct(
        "_id"
      );

      return await Post.find({ community: { $in: list } }).sort({ $natural: -1 })
    },



  },

  Mutation: {
    async createPost(_, { postInput: { description, user, title, community } }) {
      const existedTitle = Post.findOne({ title });
      const createdPost = new Post({
        description: description,
        user: user,
        time: new Date(),
        like: [],

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

          return await Post.findByIdAndUpdate(id, { $push: { like: user } }, { new: true })

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

  
};

module.exports = resolvers;
