var http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Bonk");
  })
  .listen(8080);

const fs = require("fs");

var data = {
  drawings: [],
  paintings: [],
  photography: [],
  sculptures: [],
  toys: [],
};

function readFiles(dirname, onFileContent) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, "utf-8", function (err) {
        if (err) {
          console.log(err);
          return;
        }
        onFileContent(filename);
      });
    });
  });
}

readFiles("./drawings/", function (filename) {
  data.drawings.push(filename);
});
readFiles("./paintings/", function (filename) {
  data.paintings.push(filename);
});
readFiles("./photography/", function (filename) {
  data.photography.push(filename);
});
readFiles("./sculptures/", function (filename) {
  data.sculptures.push(filename);
});
readFiles("./toys/", function (filename) {
  data.toys.push(filename);
});

function write() {
  dataJson = JSON.stringify(data);
  fs.writeFile("json.json", dataJson, "utf8", function readFileCallback() {
    console.log("JSON written");
  });
}

setTimeout(write, 2000);
