var express = require('express');
var router = express.Router();
const  multer = require('multer');
const mongoose = require("mongoose");
const RegistrationForm = require('../models/Registrationform');
const ProfileImage = require('../models/ProfileImage');
const Demo = require('../models/Example');
const State = require('../models/State');
const path = 'D:/responsive/BackEnd/public/images';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/userdata',

function(req,res){
  // console.log(req);
  try{  
    // console.log("dgdggd",req.body)
    data = {
      name: req.body.data.name,
        middlename: req.body.data.middlename,
        lastname: req.body.data.lastname,
        mobilenumber: req.body.data.mobilenumber,
        dob: req.body.data.dob,
        age: req.body.data.age,
        gender: req.body.data.gender,
        physical: req.body.data.physical,
        address: req.body.data.address,
        city: req.body.data.city,
        state: req.body.data.state,
        zipcode: req.body.data.zipcode,
        academicScore:req.body.data.academicScore,
        images: req.body.image.profilePicture
    }
    const newData = new RegistrationForm(data);

    newData.save((error, response) => {
      if(error){
        console.log(error);
        res.send(error);
        res.status(500).json({message: "Sorry interal server errors"});
      }else{
        // console.log(response);
        res.send({
          response
        });
      }
    })
  }catch(err){
    console.log(err);
  }
})

router.get('/userslist',function(req,res){
  // console.log("userlist",res);
  RegistrationForm.find({})
  .then(result => {
    // console.log("Getting Users List",result);
    res.status(200).json({
      newData: result
    })
  })
})

router.get('/getUserData/:id',function(req,res){
  // console.log("User Data to be Updated!",req);
  RegistrationForm.find({_id:req.params.id})
  .then(result => {
    // console.log("Getting data for Updating.",result);
    res.status(200).json({
      newData: result
    })
  })
})

router.post('/updatedform', function(req,res){
  const data = req.body;
  // console.log("Updated User Data",data,req.body);
  RegistrationForm.findByIdAndUpdate({_id: req.body.id},{
      $set:{
        name: data.name,
        middlename: data.middlename,
        lastname: data.lastname,
        mobilenumber: data.mobilenumber,
        dob: data.dob,
        age: data.age,
        gender: data.gender,
        physical:data.physical,
        address: data.address,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        academicScore:data.academicScore,
        images: data.images
      }
  },{
      new: true
  },
  function(err,updatedUserData){
    // console.log("Updated User Data!",updatedUserData);
      if(err){
          res.send("Error Updating Data");
      }else{
       
          res.send(updatedUserData);
      }
  })
})

router.post("/deleteuser", function(req,res){
  // console.log("Deleting a Data",req.body);
  RegistrationForm.remove({_id: req.body.id},
   function(err, deletedData){
    if(err){
        res.send("Error");
    }else{
        res.send(deletedData);
    }
  })
})

// Profile Image API

const storage1 = multer.diskStorage({
  destination:(req,files,callback)=> {
  callback(null, path)
  },
  filename:(req,files,callback)=> {   
  callback(null, `Profile Image_${files.originalname}`);
  }
})
var upload = multer({storage: storage1})

router.post('/uploadprofile', upload.single('file'), (req,res,next)=> {
  const file = req.file;
  var data ={
    profilePicture:'http://localhost:4000/'+file.filename,
  }
  const imageData = new ProfileImage(data);
  imageData.save(function(err,resp){
    if(err){
      res.send(err)
    }else{
      res.send(resp)
    }
  });
})

router.get('/profileImage',function(req,res){
  ProfileImage.find({})
    .then(result => {
      // console.log("asd",result);
      res.status(200).json({
        newImage: result
      })
    })
})

// State API

router.get('/getState',function(req,res){
  State.find({})
  .then(result => {
    // console.log("Getting State List",result);
    res.status(200).json({
      newData: result
    })
  })
})

module.exports = router;

function stateandcity(){
  var stateList = [
    {   id:1,
        state: 'Maharashtra',
        cities: ['Mumbai','Nagpur','Ratnagiri','Solapur','Amravati'] 
    },
    {   id:2, 
      state: 'Bihar', 
        cities: ['Patna','Muzaffarpur','Gaya','Siwan']
    },
    {   id:3,
        state: 'Kerala', 
        cities: ['Chennai','Kochi','Kozhikode','Kollam'] 
    },
    {
        id:4, 
        state: 'Delhi', 
        cities: ['New Delhi','Mehrauli','Bankauli','Libaspur','Siraspur','Bawana']
    } ,
    {   id:5, 
        state: 'West Bengal', 
        cities: ['Kolkata','Silliguri','Duragpur','Asansol']
    },
  ];

  for(var i =0; i < stateList.length; i++){
    const saveState = new State(stateList[i]);
    saveState.save();
  }
}

const getDocumentUsingComparison = async () => {
    const result = await RegistrationForm.find({'physical.weight': {$gt: 50}});
    const result2 = await RegistrationForm.find({'age': {$eq: 22}});
    const result3 = await RegistrationForm.find({'academicScore.percentage': {$lt: 80}});
    const result4 = await RegistrationForm.find({'academicScore.percentage': {$lt: 80}});
    const result5 = await RegistrationForm.find({'state': {$ne: 'Maharashtra'}});
          // console.log("Comparison Operator",result5);
}

const getDocumentUsingLogical = async () => {
  const result1 = await RegistrationForm.find({$or: [ {age: {$lte:20}}, {state: "Maharashtra"} ] });
  const result2 = await RegistrationForm.find({$and: [ {age: {$gte:20}}, {state:{ $in: ["Maharashtra","Kerala"]}}]});
  const result3 = await RegistrationForm.find({
    "gender": 
    {$not: 
      {
        $in: 
        [RegExp("Male"),RegExp("Other")]
      }
    }
  });
    console.log("Logical Operator",result3);
}

const getDocumentUsingEvalution = async () => {
  const result1 = await RegistrationForm.find({name: {$regex: /^ka/i}});
  const result2 = await RegistrationForm.find({$expr: {$gt:["$age", "$percentage"] }});
  const result3 = await RegistrationForm.find({age: {$mod:[2, 0] }});

  console.log(result3);
}



const updateDocumentField = async () => {
  
  const result1 = await RegistrationForm.updateMany({ $inc: { "age": 2} });
  const result2 = await RegistrationForm.updateMany({ _id: "6062fdea5bf3500a48f73a94" },
    { $set:
       {
         name: "Yash"
       }
    });
  const result3 = await RegistrationForm.aggregate([
    {
      $group:
        {
          _id: "$name",
          minweight: { $min: "$physical.weight" }
        }
    }
  ])
  const result4 = await RegistrationForm.updateMany({ _id: "6064208e7d2cad0e5897c105" },
    { $mul: { age: 2 } })

  const result5 = await RegistrationForm.updateMany({ $rename: { 'firstname': 'name'} })
  
  const result6 = await RegistrationForm.updateOne(
    { name: "Greed" },
    {
      $set: { age: 4 },
      $setOnInsert: { lastname: "Mugi" }
    },
    { upsert: true })
    
    const result7 = await RegistrationForm.updateOne(
    { name: "Greed" },
    { $unset: 
      { age: "", lastname: "" } })

  console.log(result7);
}

const getDocumentUsingArray2 = async () => {
  const result1 = await Demo.find( { equipment: { $all: [ "appliance", "school", "book" ] } } );
  const result2 = await Demo.find( {  qty: { $elemMatch: { $gte: 20, $lt: 50 } } } );
  const result3 = await Demo.find( { equipment: { $size: 2 } } );
  const result4 = await Demo.aggregate([
    {   
        $project: {
        gender: "Male",
        SizeOfEquipment: { $size: "$equipment" }
      }} 
  ]);
  const result5 = await Demo.find({qty: { $gte: 23 } },{ "qty.$": 1 });
  
  const result6 = await Demo.find( {}, { equipment: { $slice: 2 } } );

  console.log(result5);
}

const getDocumentUsingArrayUpdate = async () => {
  const result1 = await Demo.updateOne(
    { _id: "606576e4e634c126c828dbf3"},
    { $push: { "qty": { $each: [ 40, 60 ], $sort: 1 } } });
  
const result2 = await Demo.updateOne(
    {_id: "606576e4e634c126c828dbf3"},
    { $pull: { qty: { $in: [ 40, 60 ] }} });

const result3 = await Demo.updateOne(
    { _id: "606576e4e634c126c828dbf3"}, 
    { $pop: { qty: -1 } } );
        
const result4 = await Demo.updateOne(
    { _id: "606576e4e634c126c828dbf3"},
    { $addToSet: { qty: [ 90, 100  ] } } );

    console.log(result3);
}

const getDocumentUsingPipelineStages = async () => {
  const result1 = await Demo.aggregate([{$match: {qty: {$lt: 30}}},{$count: "Large_Quantity"}]);

  const result2 = await Demo.aggregate([{$limit: 3 }]);

  const result3 = await Demo.aggregate([{ $match : { age : 24 } }]);

  const result4 = await Demo.aggregate([ { $skip : 3 }]);

  const result5 = await Demo.aggregate([ { $unwind: "$equipment"  } ]);

  const result6 = await Demo.aggregate([{
    $lookup:
      {
        from: "states",
        localField: "cities",
        foreignField: "equipment",
        as: "inventory_equipment"
      }
 },
 { $unwind: "$inventory_equipment"},
 { $unwind: "$inventory_equipment.cities"}

]);

const result7 = await Demo.aggregate([{
  $addFields: {
    totalqty: { $sum: "$qty" }
  }
}]);

const result8 = await Demo.aggregate([
  {
    $merge: 
    {into: { db: "userdata", coll: "RegistrationForm" }, on: "_id"}
  }
]);
    
  console.log(result8);
}



// stateandcity();
// updateDocumentField();
// getDocumentUsingArray();
// getDocumentUsingEvalution();
// getDocumentUsingLogical();
// getDocumentUsingComparison();
// getDocumentUsingArray2();
// getDocumentUsingArrayUpdate();
getDocumentUsingPipelineStages();



