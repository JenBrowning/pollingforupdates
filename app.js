const express = require("express");
const multer = require("multer");
const fs = require("fs");

const publicPath = "public/";
const uploadPath = "public/uploads/";
const port = 3000;
const app = express();
app.use(express.static(publicPath));
app.use(express.json());
const upload = multer({dest: uploadPath}) 

app.set("views", "./views" )
app.set("view engine", "pug")

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

function checkForNewMessage() {
    return fetch( {
        method: "POST",
        body: JSON.stringify({"after": "number"}),
        header: {"content-type": "application/json"}
    })
}
app.get('/', (request, response) => {
    const path = './public/uploads';
    fs.readdir(path, function(err, items) {
        console.log(items);
        response.render("index", {items})
    })
})


app.post('/latest', (request, response) => {
    console.log("Uploaded: " );
    const arrayOfImages = [];
    fs.readdir(uploadPath, (err, items) => {
        let highestTimeStamp = 0;
        items.forEach(item => {
            var modified = fs.statSync("public/uploads/" + item).mtimeMs;
            console.log(modified)
            if(modified > request.body.after) {
                arrayOfImages.push("uploads/" + item);
            }
            if(modified > highestTimeStamp) {
                highestTimeStamp = modified;
            }
        })
        response.send({images: arrayOfImages, timestamp: highestTimeStamp})
    })
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded" + request.file.filename);
    uploadedFiles.push(request.file.filename);
    response.render("uploads", {image: request.file.filename})
})

app.listen(port, () => console.log("Server running on" + port));