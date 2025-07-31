const mongoose = require('mongoose');


function ConnectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err)=>{
        logger.error('Error connecting to MongoDB:', err);
    })
}

module.exports=ConnectDB;
