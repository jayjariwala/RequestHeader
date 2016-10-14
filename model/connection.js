var mongoose=require('mongoose');
//connect with mlab
mongoose.connect("mongodb://test:test@ds053146.mlab.com:53146/tinyurl_12");

var Schema=mongoose.Schema;

//create Schema

var userSchema= new Schema({
  id:String,
  address:String
});


var getConnection = mongoose.model('Urls', userSchema);
module.exports=  getConnection;
