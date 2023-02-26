const postResolvers = require("./post/resolver");
const commentResolvers = require("./comment/resolver");

 

module.exports= [
    postResolvers,
    commentResolvers
]