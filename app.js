//jshint esversion:6

const express=require("express")
const bodyParser=require("body-parser");
const res = require("express/lib/response");
const ejs = require('ejs');
const app=express();
app.set('view engine','ejs');

var items=["buy food","cook food"];
var workItems=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
var today=new Date();

let options={
  weekday:"long",
  day:"numeric",
  month:"long"
}

let day=today.toLocaleDateString("en-US",options);

res.render("list",{listTitle:day, newListItems:items});
});

app.post("/",function(req,res){
   var item=req.body.newItem;
   if(req.body.list==="Work"){
     workItems.push(item);
     res.redirect("/work");
   }else{
     items.push(item);
    res.redirect("/");
   }

})

app.get("/work",function(req,res) {
  res.render("list",{listTitle:"Work list",newListItems:workItems})
})

app.get("/about",function(req,res){
  res.render("about");
})

app.listen(3000,function(){
    console.log("server started running");
});
