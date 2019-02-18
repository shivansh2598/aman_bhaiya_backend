const express=require('express')
const app= express();
const router=express.Router();
const mongoose=require('mongoose');
const multer=require('multer')
const upload=multer({dest:'uploads'});
const cors= require('cors');
const axios=require('axios');
var url =require('url');
const port = 7019;

var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
var path=require('path')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://code:codecode1@ds125125.mlab.com:25125/stonedsanta");

var orderSchema = new mongoose.Schema({
    type: String,
    placedby: String,
    telephone: String,
    image_id: String,
    specification: String,
    sellingprice: Number,
    costprice: Number,
    advancepaid: Number,
    shippingdate: String,
    status: String,
});

var employeeSchema = new mongoose.Schema({
    employee_id: String,
    employee_name: String,
    email: String,
    password: String,
});

var artistSchema = new mongoose.Schema({
    artist_id: String,
    artist_name: String,
    email: String,
    art: String,
    password: String,
});

var orderDB = mongoose.model('order', orderSchema,'order');
var employeeDB = mongoose.model('employee', employeeSchema,'employee');
var artistDB = mongoose.model('artist', artistSchema,'artist');

app.post("/employee/signup",(req,res)=>{
   var {username,email,password} = req.body
   console.log(req.body)
   var eData = new employeeDB({
    username,
    email,
    password
      });
eData.save().then(item => {
    var query = {
        $and:
        [
            {"email":email},
            {"username":username}
        ] }

        sellerDB.find(query,function(err,response){
            if (err) {
                return console.error(err)
            }
             console.log(response[0]._id)
             res.send(response[0]._id)
            },{});
            })
            .catch(err => {
            console.log(err)
            res.status(400).send("Unable to save to database");
});
});

app.post("/employee/login",(req,res)=>{
   var {username,email} = req.body
   //console.log(username)
    var query = {
            $and:
            [
                {"email":email},
                {"username":username}
            ] }
    sellerDB.find(query,function(err,response){
        if (err) {
            return console.error(err)
        }
        res.send(response[0]._id)
    },{});
});

app.post("/artist/signup",(req,res)=>{
   var {username,email} = req.body
   var cData = new customerDB({
    username,
    email,
      });
      
cData.save().then(item => {
   var query = {
    $and:
    [
        {"email":email},
        {"username":username}
    ] }
customerDB.find(query,function(err,response){
if (err) {
    return console.error(err)
}
 console.log(response[0]._id)
 res.send(response[0]._id)
},{});
})
.catch(err => {
    console.log(err)
    res.status(400).send("Unable to save to database");
});
});

app.post("/artist/login",(req,res)=>{
    //console.log(req.body);
    var {username,email} = req.body
    var query = {
            $and:
            [
                {"email":email},
                {"username":username}
            ] }
    customerDB.find(query,function(err,response){
        if (err) {
            return console.error(err)
        }
         console.log(response[0]._id)
         res.send(response[0]._id);
    },{});
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

app.patch("/order/changestatus",(req,res)=>{
    // console.log(req.body._id);
      var query = {"_id": req.body.data._id}
      orderDB.update({_id: req.body.data._id}, {
        status:req.body.data.status
    }, function(err, affected, resp) {
       console.log(resp);
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

app.listen(port,()=>
{
    console.log(`listen on ${port}`)
})