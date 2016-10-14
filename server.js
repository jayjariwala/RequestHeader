//npm install <module_name> --save-dev

var express=require('express');
var app=express();
var controller=require('./controller/controller');
var Connection=require('./model/connection');
var bodyParser = require('body-parser')
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.get('/',function(req,res){

res.sendFile(__dirname + '/index.html');

})

//calling the controller
controller(app,Connection);





var port= Number (process.env.PORT || 8081);
app.listen(port);
