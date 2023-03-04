// const express = require('express');
// const cookie = require('cookie-parser');
// const routes = require('./routes');
// const app = express();

// app.use(cookie());
// app.use(express.json());

// require('./database');


// app.use(routes);


// app.use('*',(req,res)=>{
//     res.status(404).end();
// });


// // app.get("/api",(req,res)=>{
// //     res.json({"users":['userOne',"userTwo"]});
// // })

// app.listen(5000,()=>{
//     console.log("Server started on port 5000");
// });

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


// app.use(router);


app.use(cors(corsOptionsDelegate));



const startServer = async () => { 
    const apolloServer= new ApolloServer({
        typeDefs: require('./schemas'),
        resolvers: require('./routes')
    });
await apolloServer.start();
apolloServer.applyMiddleware({app});
app.listen(5000,()=>{
    console.log("Server started on port 5000");
})};
startServer();