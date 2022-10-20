const express = require('express');

const jwt = require('jsonwebtoken');

const app = express();

app.listen(4000,() => {
    console.log("app listen");
})

app.get("/", (req,res) => {
    res.json({
        msg: 'Hello JWT'
    })
})

app.post("/login", (req,res) => {
    var userdata = {id:1, username:"Hashini",age:26};

    jwt.sign({user:userdata},"secretkey",(err,token) => {
        if(err){
            res.json({error:err})
        }else{
            res.json({token:token})
        }
    })
})

app.post("/save", verifyToken, (req,res) => {

    jwt.verify(req.token,"secretkey", (err,data) => {
       
        if(err){
            res.json({error:err})
        }else{
            res.json({msg:"Data saved",data:data})
        }
    })

})

function verifyToken(req,res,next) {
    if(typeof(req.headers['authorization']) != 'undefined' && req.headers['authorization'] != 'undefined') {
        var headerToken = req.headers['authorization'].split(' ')[1];
        if(headerToken !== 'undefined'){
            req.token = headerToken;
            next();
        }else{
            res.json({msg:"Unauthorized Request"})
        }
    }else{
        res.json({msg:"Unauthorized Request"})
    }
    // console.log(req.headers);
}