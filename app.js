const express=require("express");
const bodyParser=require("body-parser");
const app=express();
let newTasks=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.get("/",function(req,res){
    let today=new Date();
    let options={
        weekday:'long',
        day:'numeric',
        month:'long',
    };
    let day=today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle:day, listTask:newTasks});
})

app.post("/",function(req,res){
    let newTask=req.body.task;
    newTasks.push(newTask);
    res.redirect("/");  
})
app.listen(3000,function(){
    console.log("Listining to port 3000");
})  