var mongoose=require('mongoose')

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


var orderDB = mongoose.model('order', orderSchema,'order');
module.exports=orderDB