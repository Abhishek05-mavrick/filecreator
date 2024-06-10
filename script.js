const express = require('express');
const fs = require("node:fs");
const path = require('path'); // Add this line
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, "public")));

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{ files:files});
    });
    
});


app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`, req.body.describe,function(err){
  res.redirect("/");
    });
    });

    app.get("/files/:filename",function(req,res){
        fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err , filedata){
            res.render("show",{filename: req.params.filename,filedata:filedata});
        });
        
    });




app.listen(3000,function(){
    console.log("bhaiya ready!...")
});