const express = require('express');
// const cookie = require('cookie-parser');
const {router} = require('./routes');
const {graphqlUploadExpress} = require('graphql-upload');
const app = express();
const {ApolloServer} = require('apollo-server-express');
var cors = require('cors')
const server = require('http').createServer(app);
const socketio = require('socket.io');
const mongoose = require('mongoose');

// app.use(cookie());
app.use(express.json());
app.use(express.static('upload'));
var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true ,credentials:true} // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

require('./database');

app.use(cors(corsOptionsDelegate));

const startServer = async () => { 
    app.use(graphqlUploadExpress());
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
const http = app.listen(5000, () =>
  console.log("🚀 Server ready at http://localhost:5000" + server.graphqlPath)
)
const io = socketio(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
io.on('connection', (socket) => {
  socket.emit('me', socket.id);
  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });
  socket.on('calluser', ({userToCall, signalData, from, name}) => {
    io.to(userToCall).emit("calluser",{signal: signalData, from, name});
  });
  socket.on('answercall', (data) => {
    io.to(data.to).emit('callaccepted', data.signal);
  });
});
}
startServer();