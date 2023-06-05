const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://sahtek:LnMgTI7l8sjRsEL@cluster0.b0ubq7p.mongodb.net/sahtek?retryWrites=true&w=majority').then(()=>{
    console.log("CONNEXION DB OK !");
}).catch((e)=>{
    console.log("CONNEXION KO !",e);
})
