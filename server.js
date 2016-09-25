//npm install <module_name> --save-dev

var express=require('express');
var app=express();


app.get('/',function(req,res){
res.sendFile(__dirname + '/index.html');

})

app.get('/whoami',function(req,res){
res.writeHead(200,{'content-type':'application/json'});
var ip= (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
var agent=req.headers['user-agent'];
var lang=req.headers['accept-language'];
var shortlang=lang.slice(0,lang.indexOf(","));
var shortAgent=agent.slice(0,agent.indexOf(")")+1);
var myobj ={
  ipaddress:ip,
  language:shortlang,
    os:shortAgent
}

res.end(JSON.stringify(myobj));


})

var port= Number (process.env.PORT || 8086);
app.listen(port);
