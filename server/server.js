const express = require('express');
const cookie = require('cookie-parser');
const {router} = require('./routes');
const app = express();
const {ApolloServer} = require('apollo-server-express');
var cors = require('cors')

const mongoose = require('mongoose');

app.use(cookie());
app.use(express.json());

var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

require('./database');

app.use(cors(corsOptionsDelegate));

const startServer = async () => { 
    const apolloServer= new ApolloServer({
        typeDefs: require('./schemas'),
        resolvers: require('./routes'),
        context: ({ req, res }) => {
          // Pass the `res` object to the resolver context
          return { req, res };
        }
    });
await apolloServer.start();
apolloServer.applyMiddleware({app});
app.listen(5000,()=>{
    console.log("Server started on port 5000");
})};
startServer();