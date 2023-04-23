// imports
const express = require('express');
const path = require('path');





var __dirname = path.resolve();

// server config
const app = express()
const port = 7000

var http = require("http").createServer(app);


// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/css', express.static(__dirname + 'public/fonts'));
app.use("/public", express.static(__dirname + '/public'));




// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

var TAB = "\t";

app.get('/galleryList', (req, res) => {
    res.render('gallerylist');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})
app.get('/addFiles', (req, res) => {
    res.render('addfiles');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})
app.get('/selectTemplate', (req, res) => {
    res.render('selecttemplate');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/createTemplate', (req, res) => {
    res.render('createtemplate');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})

app.get('/imageGallery', (req, res) => {
    res.render('imagegallery');
    console.log(Date() + TAB + req.socket.localAddress + TAB + req.url);
})


http.listen(port, () => console.log(`app listening on port ${port}!`));
