
require('dotenv').config();
const { MONGODB_URL } = process.env;

// imports
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParse = require("body-parser");


var __dirname = path.resolve();

// server config
const app = express()
const port = 8008

var http = require("http").createServer(app);

app.use(express.json());

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/css', express.static(__dirname + 'public/fonts'));
app.use("/public", express.static(__dirname + '/public'));



//Router Setting  MinGi추가
const router = require("./routes/index");
app.use(router);



// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

var TAB = "\t";

app.get('/', (req, res) => {
    res.render('galleryList.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/drawkey', (req, res) => {
    res.render('drawkey.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/drawtemplate', (req, res) => {
    res.render('drawtemplate.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/galleryList', (req, res) => {
    res.render('galleryList.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})
app.get('/addFiles', (req, res) => {
    res.render('addFiles.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})
app.get('/selectTemplate', (req, res) => {
    res.render('selectTemplate.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/createTemplate', (req, res) => {
    res.render('createTemplate.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/imageGallery', (req, res) => {
    res.render('imageGallery.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/posttest', (req, res) => {
    res.render('posttest.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/updatedataset', (req, res) => {
    res.render('updatedataset.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/note2', (req, res) => {
    res.render('note2.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/note', (req, res) => {
    res.render('note.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/note3', (req, res) => {
    res.render('note3.ejs');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})


/*
mongoose.connect("mongodb://localhost:27017/labelviewer-db", {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
})
*/


console.log("before db");

(async () => {
    try {
      await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("mongoDB Connected!");
    } catch (err) {
      console.error("mongoDB Connection Error!", err);
    }
  })();


http.listen(port, () => console.log(`app listening on port ${port}!`));
