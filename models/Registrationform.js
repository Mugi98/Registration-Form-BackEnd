const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/userdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(()=> 
console.log("Connection is Successfully Done for RegistrationFormSchema")
).catch((err)=> 
console.log(err)
);

const RegistrationFormSchema = new mongoose.Schema({
        name: String,
        middlename: String,
        lastname: String,
        mobilenumber: Number,
        dob: Date,
        age: Number,
        gender: String,
        physical: [{
            bloodgroup: String,
            height: String,
            weight: Number
        }],
        address: String,
        city: String,
        state: String,
        zipcode: Number,
        academicScore:[{
            academic: String,
            hundred: Number,
            percentage: Number,
        }],
        images: String
    
})

const RegistrationForm= mongoose.model('RegistrationForm',RegistrationFormSchema);

module.exports = RegistrationForm;