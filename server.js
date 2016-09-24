//npm install <module_name> --save-dev

var express=require('express');
var app=express();


app.get('/',function(req,res){
res.sendFile(__dirname + '/index.html');

})

app.get('/whoami',function(req,res){
res.writeHead(200,{'content-type':'application/json'});
var ip=req.connection.remoteAddress;
var agent=req.headers['user-agent'];
var lang=req.headers['accept-language'];
var myobj ={
  ipaddress:ip,
  language:lang,
    os:agent
}

res.end(JSON.stringify(myobj));


})

var port= Number (process.env.PORT || 8085);
app.listen(port);
