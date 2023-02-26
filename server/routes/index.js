const router =require('express').Router();
const apiRouter = require('./api');

router.use('/api',apiRouter);

const consultationResolvers = require("./consultation/resolver");
const feedbackResolvers = require("./feedback/resolver");
const patientFileResolvers = require("./patientFile/resolver");

module.exports= [
    consultationResolvers,
    feedbackResolvers,
    patientFileResolvers,
    router
]