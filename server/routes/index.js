const postResolvers = require("./post/resolver");
const commentResolvers = require("./comment/resolver");
const consultationResolvers = require("./consultation/resolver");
const feedbackResolvers = require("./feedback/resolver");
const patientFileResolvers = require("./patientFile/resolver");

module.exports= [
    consultationResolvers,
    feedbackResolvers,
    patientFileResolvers,
    postResolvers,
    commentResolvers,
    router

]