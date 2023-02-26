const express = require('express');
const cookie = require('cookie-parser');
const routes = require('./routes');
const app = express();

app.use(cookie());
app.use(express.json());

require('./database');


app.use(routes);


app.use('*',(req,res)=>{
    res.status(404).end();
});


// app.get("/api",(req,res)=>{
//     res.json({"users":['userOne',"userTwo"]});
// })

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});