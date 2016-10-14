var validUrl=require('valid-url');
var crypto=require('./crypto');




 module.exports= function(app,Connection)
 {


   //demo data

/*
siteData.save(function(err){
  if(err) throw err;

  console.log("Data Saved Successfully");

})
*/
   app.get('/tinyurl/:inputurl//:input2',function(req,res){

     var url= req.params.inputurl+"//"+req.params.input2;
   console.log(url);

     if (validUrl.isUri(url)){
       var value1=crypto(4);
       console.log(value1);
       var siteData=new Connection({
         id:value1,
         address:url
       });
       var sendObject={
         old_url:url,
         New_url:req.protocol + '://' + req.get('host') +  "/" +value1
       }
       siteData.save(function(err){
         if(err) throw err;
         console.log("Collection Saved Successfully");
       })
       res.end(JSON.stringify(sendObject));
   } else {

       res.end(JSON.stringify(noturi));
   }

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

   app.post('/url', function(req, res) {
      var url=req.body.url
      res.writeHead(301,{Location:"/tinyurl/"+url});
      res.end();
   });

   app.get('/:inputurl',function(req,res){
     var url=req.params.inputurl;
     var Nodata={"Error":"No such address found in database"}
     if(url.toString()== "favicon.ico")
     {
     }
     else {

       Connection.findOne({id:url},function(err,data){
         if(data==null)
         {
           res.end(JSON.stringify(Nodata));
         }
          else
            {
              res.writeHead(301,{Location:data.address});
              res.end();
            }

       })

     }



   })






 }
