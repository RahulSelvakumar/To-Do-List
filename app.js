const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine','ejs');

mongoose.connect("mongodb+srv://Rahul:test123@cluster0.9nzv9nc.mongodb.net/todolistDB");
const listSchema= new mongoose.Schema({
    name:String
});
const Item=mongoose.model("Item",listSchema);

app.get("/",function(req,res){
    Item.find({},function(err,foundItems){
        res.render("list",{listTitle:"Today", listTask:foundItems});
    });
})

app.post("/",function(req,res){
    let itemName=req.body.task;
    const item = new Item({
        name:itemName
    });
    Item.insertMany(item);
    res.redirect("/");  
})

app.post("/delete",function(req,res){
    const deleteItem=req.body.check;  
    Item.findByIdAndRemove({_id:deleteItem},function(err){
        if(!err){
            console.log("Sucess");
        }
    })
    res.redirect("/");
});


app.listen(3000,function(){
    console.log("Listining to port 3000");
})  