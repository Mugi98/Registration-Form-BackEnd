const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/userdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(()=> 
console.log("Connection is Successfully Done for ProfileImageSchema")
).catch((err)=> 
console.log(err)
);

const ProfileImageSchema = new mongoose.Schema({
     
        profilePicture: String

})

const ProfileImage= mongoose.model('ProfileImage',ProfileImageSchema);

module.exports = ProfileImage;