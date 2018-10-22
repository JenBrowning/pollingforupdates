const express = require("express");
const multer = require("multer");
const fs = require("fs");

const publicPath = "public/";
const uploadPath = "public/uploads/";
const port = 3000;
const app = express();
app.use(express.static(publicPath));
const upload = multer({dest: uploadPath}) 

const uploadedFiles = [
    'uploads/sadface.jpg',
    'uploads/smileyface.jpg',
    'surpriseface.jpg',
];

function pictureDisplayer(imgNames) {
    let outputString = "";
    for(let i = 0; i < imgNames.length; i++) {
        const name = imgNames[i];
        console.log(name);
        outputString += `<img src="uploads/${name}"/>` 
    }
    return outputString;
}
app.get('/', (request, response) => {
    const path = './public/uploads';
    fs.readdir(path, function(err, items) {
        console.log(items);
        response.send(`<h1>Welcome to KenzieGram~</h1>
        <form id="user-create-form" action="http://localhost:3000/uploads" method="POST" enctype="multipart/form-data">
        <fieldset>
            <legend>UPload File Here</legend>
            
            <label for="myfile">Choose File: </label>

            <input type="file" name="myFile" id="myFile">

            <button type="submit" value="Submit">Submit</button>
        </fieldset>
        </form>
        ${pictureDisplayer(uploadedFiles)}
    <img src="uploads/surpriseface.jpg">
    <img src="uploads/sadface.jpg">   
    <img src="uploads/smileyface.jpg"/>`);
    })
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded" + request.file.filename);
    uploadedFiles.push(request.file.filename);
    response.end(`<h1>Congratulations</h1>
    <a href="/">Click here to go back!</a>
    <img src="uploads/${request.file.filename}">`);
})

app.listen(port, () => console.log("Server running on" + port));
