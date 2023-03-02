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
const cors = require("cors")
const cookie = require('cookie-parser');
const {router} = require('./routes');
const app = express();
const {ApolloServer} = require('apollo-server-express');

const mongoose = require('mongoose');
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.use(cookie());
app.use(express.json());

require('./database');


// app.use(router);






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