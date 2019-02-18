const express = require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose=require('mongoose')
const config=require('./config')
const login=require('./schema/login')
const verifytoken=require('./auth/VerifyToken')
const multer=require('multer')
const upload=multer({dest:'uploads'});
var url =require('url');
const orderDB=require('./schema/orderschema')
const artistDB=require('./schema/artistschema')


//MongoDb Connections

mongoose.Promise = global.Promise;

mongoose.connect(config.url,{ useNewUrlParser: true });

mongoose.connection.once('open', function () {
  console.log("Database connection opened");
});

mongoose.connection.on('error', function (error) {
  console.log("Database connection error %s", error);
});

//
mongoose.connection.on('reconnected', function() {
  console.log("Database reconnected");
});
//
mongoose.connection.on('disconnected', function() {
  console.log("Database disconnected");
  mongoose.connect(config.url,{ useNewUrlParser: true });
});



//middlewares
app.use(cors())
app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended:false }))
app.use('/uploads', express.static('uploads'));
var path=require('path')




//post
// app.post('/',(req,res)=>{
//     console.log(req.body.passwordconf)
    
//     login.find({email:req.body.email},(err,user)=>{
//         if(user[0]!=null){
//             console.log(user)
//         res.send({status:409,
//             msg:"This email id already exits"})
//         }
//         else if(err)
//         {
//             res.send({status:409,
//                 msg:"something went wrong"})
//         }

   


//     else if (req.body.password !== req.body.passwordconf) {
//         res.send({status:400,
//             msg:"passwords dont match"})
//       }
    
//      else if (req.body.email &&
//         req.body.password &&
//         req.body.passwordconf) {
    
//         var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
//             login.create({
//               email : req.body.email,
//               password : hashedPassword,
//             },
//             function (err, user) {
//               if (err) return res.status(500).send("There was a problem registering the user.")
//               // create a token
//               var token = jwt.sign({ id: user._id }, config.secret, {  //jwt sign encodes payload and secret
//                 expiresIn: 86400 // expires in 24 hours
//               });
//               res.status(200).send({status:200, auth: true, token: token });
//             // res.status(200).send({status:200, auth: true, token: token }
//             }); 
//       }
//     })
// })

// app.post('/login',(req,res)=>{

//     login.findOne({email:req.body.email},(err,user)=>{
//         if(user===undefined||user===null)
//         res.send({status:404,msg:'not a user, sign up first'})
//         else if(err)
//         res.send({status:500,msg:'internal server error, try again'})

//         else
//         {

//         console.log(user)

//         var passwordIsValid=bcrypt.compareSync(req.body.password,user.password);

//         if (!passwordIsValid) return res.send({ token: null,status:401,msg:'wrong password , try again' });

//         var token=jwt.sign({ id:user._id },config.secret,{
//             expiresIn:86400 // expires in 24 hours
//         } )

//         res.send({ status:200, token: token });

//     }

//     })
// })

//aman bhaiya 


app.post("/employee/signup",(req,res)=>{
//   var {username,email,password} = req.body
//   console.log(req.body)
//   var eData = new employeeDB({
//    username,
//    email,
//    password
//      });
// eData.save().then(item => {
//    var query = {
//        $and:
//        [
//            {"email":email},
//            {"username":username}
//        ] }

//        sellerDB.find(query,function(err,response){
//            if (err) {
//                return console.error(err)
//            }
//             console.log(response[0]._id)
//             res.send(response[0]._id)
//            },{});
//            })
//            .catch(err => {
//            console.log(err)
//            res.status(400).send("Unable to save to database");
// });
console.log(req.body.passwordconf)
    
    login.find({email:req.body.email},(err,user)=>{
        if(user[0]!=null){
            console.log(user)
        res.send({status:409,
            msg:"This email id already exits"})
        }
        else if(err)
        {
            res.send({status:409,
                msg:"something went wrong"})
        }

   


    else if (req.body.password !== req.body.passwordconf) {
        res.send({status:400,
            msg:"passwords dont match"})
      }
    
     else if (req.body.email &&
        req.body.password &&
        req.body.passwordconf) {
    
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
            login.create({
              email : req.body.email,
              password : hashedPassword,
              name:req.body.name
            },
            function (err, user) {
              if (err) return res.status(500).send("There was a problem registering the user.")
              // create a token
              var token = jwt.sign({ id: user._id }, config.secret, {  //jwt sign encodes payload and secret
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({status:200, auth: true, token: token });
            // res.status(200).send({status:200, auth: true, token: token }
            }); 
      }
    })

});

app.post("/employee/login",(req,res)=>{
  // var {username,email} = req.body
  // //console.log(username)
  //  var query = {
  //          $and:
  //          [
  //              {"email":email},
  //              {"username":username}
  //          ] }
  //  sellerDB.find(query,function(err,response){
  //      if (err) {
  //          return console.error(err)
  //      }
  //      res.send(response[0]._id)
  //  },{});


  login.findOne({email:req.body.email},(err,user)=>{
    if(user===undefined||user===null)
    res.send({status:404,msg:'not a user, sign up first'})
    else if(err)
    res.send({status:500,msg:'internal server error, try again'})

    else
    {

    console.log(user)

    var passwordIsValid=bcrypt.compareSync(req.body.password,user.password);

    if (!passwordIsValid) return res.send({ token: null,status:401,msg:'wrong password , try again' });

    var token=jwt.sign({ id:user._id },config.secret,{
        expiresIn:86400 // expires in 24 hours
    } )

    res.send({ status:200, token: token });

}

})


});

app.post("/artist/signup",(req,res)=>{
  artistDB.find({email:req.body.email},(err,user)=>{
    if(user[0]!=null){
        console.log(user)
    res.send({status:409,
        msg:"This email id already exits"})
    }
    else if(err)
    {
        res.send({status:409,
            msg:"something went wrong"})
    }




else if (req.body.password !== req.body.passwordconf) {
    res.send({status:400,
        msg:"passwords dont match"})
  }

 else if (req.body.email &&
    req.body.password &&
    req.body.passwordconf) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
        artistDB.create({
          email : req.body.email,
          password : hashedPassword,
          name:req.body.name,
          art:req.body.art
        },
        function (err, user) {
          if (err) return res.status(500).send("There was a problem registering the user.")
          // create a token
          var token = jwt.sign({ id: user._id }, config.secret, {  //jwt sign encodes payload and secret
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({status:200, auth: true, token: token });
        // res.status(200).send({status:200, auth: true, token: token }
        }); 
  }
})
});

app.post("/artist/login",(req,res)=>{
  artistDB.findOne({email:req.body.email},(err,user)=>{
    if(user===undefined||user===null)
    res.send({status:404,msg:'not a user, sign up first'})
    else if(err)
    res.send({status:500,msg:'internal server error, try again'})

    else
    {

    console.log(user)

    var passwordIsValid=bcrypt.compareSync(req.body.password,user.password);

    if (!passwordIsValid) return res.send({ token: null,status:401,msg:'wrong password , try again' });

    var token=jwt.sign({ id:user._id },config.secret,{
        expiresIn:86400 // expires in 24 hours
    } )

    res.send({ status:200, token: token });

}

})
});




app.get("/employee/order",(req,res)=>{
   //var parsedUrl = url.parse(req.url,true)
   //const nOE=parsedUrl.query.nOE
orderDB.find(function(err,response){
   if (err) {
       return console.error(err)
   }
   //console.log(response)
   res.send(response)
   console.log(response)
},{});
});

app.get("/artist/stringart",(req,res,next)=>{
   var parsedUrl = url.parse(req.url,true)
   const sid=parsedUrl.query.sid
   console.log(sid)
   var query = {"seller_id": sid}
productDB.find(query,function(err,response){
   if (err) {
       return console.error(err)
   }
   console.log('aman',response[0])
   res.send(response[0])
},{});
});

app.get("/artist/portrait",(req,res,next)=>{
   var parsedUrl = url.parse(req.url,true)
   const sid=parsedUrl.query.sid
   console.log(sid)
   var query = {"seller_id": sid}
productDB.find(query,function(err,response){
   if (err) {
       return console.error(err)
   }
   console.log('aman',response[0])
   res.send(response[0])
},{});
});

app.get("/getdataforupdate",(req,res)=>{
   var parsedUrl = url.parse(req.url,true)
   const oid=parsedUrl.query.oid
   console.log(oid)
   var query = {"_id": oid}
orderDB.find(query,function(err,response){
   if (err) {
       return console.error(err)
   }
   res.send(response[0])
},{});
});

app.get("/employee/order/stringart",(req,res)=>{
   var query = {"type": "String Art"}
orderDB.find(query,function(err,response){
   if (err) {
       return console.error(err)
   }
   res.send(response)
},{});
});


app.get("/employee/order/portrait",(req,res)=>{
   var query = {"type": "Portrait"}
orderDB.find(query,function(err,response){
   if (err) {
       return console.error(err)
   }
   res.send(response)
},{});
});


app.post("/order/update",upload.single('photo','_id','ptype','placedby','telephone','sellingprice','specification','costprice', 
'advancepaid', 'shippingdate','status'), (req, res) => {
   console.log(req);
   const{ptype,_id,sellingprice,specification,status,costprice,advancepaid,placedby,telephone,shippingdate}=req.body;
   console.log(req.file)
   var image_id;
   if(req.file!=undefined)
   image_id = req.file.filename
   else 
   {
      var query = {"_id": _id}
      orderDB.find(query,function(err,response){
          if (err) {
              return console.error(err)
          }
          image_id=response[0].image_id;
      },{});   
   }
  orderDB.update({_id: _id}, {
      type: ptype,
      image_id,
      specification,
      sellingprice,
      costprice,
      placedby,
      telephone,
      advancepaid,
      shippingdate,
      status,
  }, function(err, affected, resp) {
     res.send("Updated");
  })
});



app.post("/order/submit",upload.single('photo','placedby','telephone','ptype','sellingprice','specification','costprice', 
 'advancepaid', 'shippingdate','status'), (req, res) => {
    var parsedUrl = url.parse(req.url,true)
    //const eid=parsedUrl.query.eid
    console.log(req);
    const{ptype,sellingprice,specification,status,costprice,advancepaid,placedby,telephone,shippingdate}=req.body;
    console.log(req.file)
    var image_id;
    if(req.file!=undefined)
    image_id = req.file.filename
    else image_id="No img";
    var oData = new orderDB({
        type: ptype,
       image_id,
       specification,
       sellingprice,
       costprice,
       placedby,
       telephone,
       advancepaid,
       shippingdate,
       status,
          });
    oData.save().then(item => {
                 console.log("saved to DB");
                 res.send("saved to DB");
                })
                .catch(err => {
                console.log(err)
                res.status(400).send("Unable to save to database");
    });
  });


  app.patch("/order/changestatus",(req,res)=>{
    // console.log(req.body._id);
      var query = {"_id": req.body.data._id}
      orderDB.update({_id: req.body.data._id}, {
        status:req.body.data.status
    }, function(err, affected, resp) {
       console.log(resp);
    })
});



app.delete("/order/delete",(req,res)=>{
  // console.log(req.body._id);
    var query = {"_id": req.body._id}
orderDB.deleteOne(query,function(err,response){
   if (err) {
       return console.error(err)
   }
   res.send("Deleted")
},{}); 
});



//mera code

app.get('/',verifytoken,(req,res)=>{
    res.send({status:200,msg:'success'})
})

app.get('/logout',(req,res)=>{
    res.status(200).send({ auth: false, token: null,value:0 });
  })

app.get('*',(req,res)=>{
    res.end("hola")
})

app.listen(7019)