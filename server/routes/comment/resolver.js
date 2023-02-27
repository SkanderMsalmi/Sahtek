const Comment = require('../../database/models/Comment');
const comment = require('../../schemas/comment');
const post = require('../../schemas/post');

const resolvers = {
    Query: {   
        async getComment(_, {ID}) {
            return await Comment.findById(ID)
        },

        async getAllComments(){
            return await Comment.find();
        }
    },

    Mutation: {
      
        async createComment(_,{CommentInput:{description},  post}){
            const createdComment = new Comment({
                description: description,
                time: new Date().toISOString(),
                post: post
            })
            const res = await createdComment.save();

            return res

        },

     
        
        deleteComment: async (parent, args, context, info)=>{
            const{id}= args
            await Comment.findByIdAndDelete(id)
            return "Comment deleted";
        },


        updateComment: async(parent, args, context, info)=>{
            const{id}= args
            const {description}= args.CommentInput
            const comment = await Comment.findByIdAndUpdate(
                id,{description},{new: true}

                );
            return  comment
        },



    }

}

module.exports = resolvers;