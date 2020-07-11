const mongoose = require("mongoose")
const URI = "mongodb+srv://longtv:Aa31101997@nodejsachitecturecompon.mvtbi.mongodb.net/LONG?retryWrites=true&w=majority"


const ConnectDB = async() =>{
    await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log(`database connecting successful ... `);
}
module.exports = ConnectDB