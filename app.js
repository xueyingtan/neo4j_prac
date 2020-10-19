if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path:'.env'})
}
//Environment Variables
var PORT = process.env.PORT || 3001
var NEO_USERNAME = process.env.NEO_USERNAME
var NEO_PW = process.env.NEO_PW

// Require
// import express, {Request,Response} from "express"
// import neo4j from "neo4j-driver"
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var logger = require('morgan')
var neo4j = require('neo4j-driver');
//App
var app = express()
//View Engine
app.set('views', path.join(__dirname + "/views"))
app.set("view engine",'ejs')

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"public")))

// Database bolt protocol
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(NEO_USERNAME,NEO_PW))
var session = driver.session()

// Index page
app.get('/', (req,res)=>{
    var name = "root"
    session
        .run(`MATCH(n:LEAF) RETURN n LIMIT 5`)
        .then(function(result){
            var nodes = []
            result.records.forEach((record)=>{
                console.log(record._fields[0].properties)
                nodes.push(record._fields[0].properties)
            });
            res.render('index',{
                nodes
            })
        })
})

//Listener
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})



