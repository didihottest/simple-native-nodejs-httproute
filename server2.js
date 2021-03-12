const http = require("http");
const fs = require("fs");
const os = require("os")
const cpuInfo = os.cpus();
const memoryInfo = os.totalmem();


var server = http.createServer(function (req, res) {
  if (req.url == "/"){
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
      res.writeHead(200, "Content-Type:text/html")
      fs.createReadStream(__dirname + "/cpu.html").pipe(res)
  } else if (req.url == "/memory"){
      res.writeHead(200, "Content-Type:text/html")
      fs.createReadStream(__dirname + "/memory.html").pipe(res)
  } else if (req.url == "/api") {
      res.writeHead(200, "Content-Type:application/json")
      fs.createReadStream(__dirname + "/cpu.json").pipe(res)
  } else {
      res.writeHead(400, "Content-Type:text/html")
      fs.createReadStream(__dirname + "/notfound.html").pipe(res)
  }
});

server.listen(3000);