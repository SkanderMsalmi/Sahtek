const express = require('express');
// const cookie = require('cookie-parser');
const { router, map } = require('./routes');
const { graphqlUploadExpress } = require('graphql-upload');
const app = express();
const { ApolloServer } = require('apollo-server-express');
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
    corsOptions = { origin: true, credentials: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

require('./database');

app.use(cors(corsOptionsDelegate));

const startServer = async () => {
  app.use(graphqlUploadExpress());
  const apolloServer = new ApolloServer({
    typeDefs: require('./schemas'),
    resolvers: require('./routes'),
    context: ({ req, res }) => {
      // Pass the `res` object to the resolver context
      return { req, res };
    }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  const http = app.listen(5000, () =>
    console.log("🚀 Server ready at http://localhost:5000")
  )
  const io = socketio(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });
  const emailToSocketMapping = new Map();
  const socketToEmailMapping = new Map();
  io.on('connection', (socket) => {
    socket.on('joinroom', (data) => {
      const { roomId, emailId } = data;
      console.log("joinroom", roomId, emailId)
      emailToSocketMapping.set(emailId, socket.id);
      socketToEmailMapping.set(socket.id, emailId);
      socket.join(roomId);
      socket.emit('joined-room', roomId);
      socket.broadcast.to(roomId).emit('user-connected', emailId);
    });
    socket.on('call-user', (data) => {
      const { emailId, offer } = data;
      const fromEmail = socketToEmailMapping.get(socket.id);
      const socketId = emailToSocketMapping.get(emailId);
      socket.to(socketId).emit('incomming-call', {
        from: fromEmail,
        offer
      });
    });
    socket.on('accepted-call', (data) => {
      const { emailId, ans } = data;
      const socketId = emailToSocketMapping.get(emailId);
      socket.to(socketId).emit('accepted-call', { ans });
    });
    //old
    // socket.emit('me', socket.id);
    // socket.on('disconnect', () => {
    //   socket.broadcast.emit('callended');
    // });
    // socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    //   io.to(userToCall).emit("calluser", { signal: signalData, from, name });
    // });
    // socket.on('answercall', (data) => {
    //   io.to(data.to).emit('callaccepted', data.signal);
    // });
  });
}
startServer();