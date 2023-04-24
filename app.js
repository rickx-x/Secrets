require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));

const url = //"mongodb+srv://admin-rithesh:test123@cluster0.5ityb8d.mongodb.net/______";
"mongodb://127.0.0.1:27017/SecretsDB";
mongoose.connect(url,{useNewUrlParser: true})
.then(()=>{console.log("Database is connected");})
.catch((err)=>{console.log(err);})


//userSchema
const userSchema = new mongoose.Schema({
    username:String,
    password:String
});

//user model
const User = mongoose.model("User",userSchema);



app.route('/')
    .get((req,res)=>{
        res.render("home");
    })
app.route('/login')
    .get((req,res)=>{
        res.render("login");
    })
    .post((req,res)=>{
        User.findOne({username:req.body.username})
        .then((found)=>{
            if(found != null){
                bcrypt.compare(req.body.password, found.password, function(err, result) {
                    if(result){
                        res.render("secrets");
                    }
                    else{
                        res.send("enter correct Username and Password");
                    }
                });
            }
            else{
                res.send("enter correct Username and Password");
            }
        })
    })
app.route('/register')
    .get((req,res)=>{
        res.render("register");
    })
    .post((req,res)=>{

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            User.create({ 
            username:req.body.username,
            password:hash
            })
            .then(result => {
            // console.log(result)
            res.render("secrets");
        });
        })
    })





app.listen(3000,()=>{
    console.log("server started at port 3000");
})

