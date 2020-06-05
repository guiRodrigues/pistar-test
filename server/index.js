const express = require('express');
const multer = require("multer");
const http = require("http");
const path = require("path");
const fs = require("fs");
const formidable = require('formidable')

const app = express();

// app.use(cors({origin: 'http://localhost:3333'}));

app.use(express.static('public'));

app.listen(3333, () => {
  console.log('Server running on: http://localhost:3333');
});

app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();

  form.uploadDir = path.join(__dirname, 'tmp_uploads');

  console.log(form)

  form.on('file', function (name, file){
      fs.rename(file.path, path.join(__dirname, 'uploads/' + file.name));
  });

  form.on('error', function(err) {
    console.log('Error occurred during processing - ' + err);
});

// Invoked when all the fields have been processed.
form.on('end', function() {
    console.log('All the request fields have been processed.');
});

  // form.on('file', function (name, file){
  //     console.log('Uploaded ' + file.name);
  // });

  res.status(200);
});


// app.post(
//   "/upload",
//   upload.single("data" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     const tempPath = req.file.path;
//     const targetPath = path.join(__dirname, "./uploads/image.png");

//     if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(200)
//           .contentType("text/plain")
//           .end("File uploaded!");
//       });
//     } else {
//       fs.unlink(tempPath, err => {
//         console.log(err)
//         // if (err) return handleError(err, res);

//         // res
//         //   .status(403)
//         //   .contentType("text/plain")
//         //   .end("Only .png files are allowed!");
//       });
//     }
//   }
// );