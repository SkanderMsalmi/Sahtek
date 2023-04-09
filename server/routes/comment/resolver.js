const Comment = require('../../database/models/Comment');
const Post = require('../../database/models/Post');
const { User } = require('../../database/models/User');


const resolvers = {
    Query: {
        async getComment(_, { ID }) {
            return await Comment.findById(ID)
        },

        async getAllComments() {
            return await Comment.find();
        },


        async getCommentsByPostId(_, { id }) {
            return await Comment.find({ post: id });
        },



    },

    Mutation: {

        async createComment(_, { CommentInput: { description }, post, user }) {
            const createdComment = new Comment({
                description: description,
                time: new Date().toISOString(),
                post: post,
                user: user
            })
            await Post.findByIdAndUpdate(
                post, { $inc: { commentsCount: 1 } }, { new: true }

            );

            const res = await createdComment.save();

            return res

        },



        deleteComment: async (parent, args, context, info) => {
            const { id } = args
            const { post } = args

            
            const postt = await Post.findById(post)
            if(postt.commentsCount > 0){
                 await Post.findByIdAndUpdate(post,{ $inc: { commentsCount: -1 } }, { new: true });               
                 await Comment.findByIdAndDelete(id);
                 return "post count dec";
           }else{
            await Comment.findByIdAndDelete(id);
            return "Comment deleted";
           }
          
          
        },


        updateComment: async (parent, args, context, info) => {
            const { id } = args
            const { description } = args.CommentInput
            const comment = await Comment.findByIdAndUpdate(
                id, { description }, { new: true }

            );
            return comment
        },



    },
    Comment: {

        user: async (parent, args) => {
            return await User.findById(parent.user);
        },
        post: async (parent, args) => {
            return await Post.findById(parent.post);
        },

    },








}

module.exports = resolvers;