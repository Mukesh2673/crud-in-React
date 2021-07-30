const express= require("express");
var bodyParser = require('body-parser');
const app=express();
const mysql=require("mysql");
app.use(bodyParser.json());

//create database connection
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodecrud",
});
conn.connect((err)=>{
    if(err) throw err
    console.log("MYSQL Connected");
});
var cors = require('cors');
app.use(cors());

//create a new record
app.post("/api/create",(req,res) =>{
let data={name: req.body.name,location: req.body.location};
let sql="INSERT INTO users SET ?";
let query=conn.query(sql,data,(err,result)=>{
    if(err) throw err;
    res.send(JSON.stringify({status:200,error:null,response:"New Record added successfully"}));
});
});

//show all records
app.get("/api/view",(req,res)=>{
let sql="SELECT * FROM  users";
let query=conn.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(JSON.stringify({ status: 200,error:null,response:result }));
});

});
//show a single Record
app.get("/api/view/:id",(req,res)=>{
let sql="SELECT * FROM users WHERE id="+req.params.id;
let query=conn.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(JSON.stringify({status :200,error:null,response:result}));
});

});
//update a record
app.put("/api/update",(req,res)=>{
let sql="UPDATE users SET name='"+req.body.name+"',location='"+req.body.location+"' WHERE id="+req.body.id;
let query=conn.query(sql,(err,result)=>{
    if(err)throw err
    res.send(JSON.stringify({status:200,error:null,response:"Record update successfull"}));
});
});
//delete a record
app.delete("/api/delete/:id",(req,res)=>{
let sql="DELETE FROM users WHERE id="+req.params.id+"";
let query=conn.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(JSON.stringify({status : 200,error : null ,response:"Record Deleted Successfully"}));
});
});


app.listen(8002,()=>{
    console.log("server started on port 8002..");
});