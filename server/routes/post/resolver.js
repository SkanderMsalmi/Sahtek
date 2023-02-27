const Post = require('../../database/models/Post');

const resolvers = {
    Query: {   
        async getPost(_, {ID}) {
            return await Post.findById(ID)
        },

        async getAllPosts(){
            return await Post.find();
        }
    },

    Mutation: {
      
        async createPost(_,{postInput:{description}}){
            const createdPost = new Post({
                description: description,
                time: new Date().toISOString(),
                like: 0
            })
            const res = await createdPost.save();

            return res

        },

        
        deletePost: async (parent, args, context, info)=>{
            const{id}= args
            await Post.findByIdAndDelete(id)
            return "Post deleted";
        },

        updatePost: async(parent, args, context, info)=>{
            const{id}= args
            const {description}= args.postInput
            const post = await Post.findByIdAndUpdate(
                id,{description},{new: true}

                );
            return  post
        },



    }

}

module.exports = resolvers;