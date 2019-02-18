var mongoose=require('mongoose')

var artistSchema = new mongoose.Schema({
    artist_name: String,
    email: String,
    art: String,
    password: String,
});

var artistDB = mongoose.model('artist', artistSchema,'artist');
module.exports=artistDB
