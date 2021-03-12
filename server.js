const http = require("http");
const fs = require("fs");
const path = require("path")
const os = require("os");
const totalmem = os.totalmem();
const cpuSpec = os.cpus();

newCpuSpec = Object.assign({}, cpuSpec)
newCpuSpec = JSON.stringify(newCpuSpec, null, 4)

fs.writeFile('json/cpu.json', newCpuSpec, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });


let memoryInfo = { memory:totalmem }
let memoryInfoToJSON = JSON.stringify(memoryInfo, null, 4)
fs.writeFile("json/meminfo.json", memoryInfoToJSON, (err) => {
    if (err) throw err;
    console.log('Memory info has been written');
});

http.createServer(function (req, res) {
    var filePath = "." + req.url;

    switch (filePath) {
        case "./":
            filePath = "./index.html";
            break;
        case "./cpuinfo":
            filePath = "./cpuinfo.html";
            break;
        case "./meminfo":
            filePath = "./meminfo.html";
            break;
        default:
            break;
    }
    
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".wasm": "application/wasm"
    };

    var contentType = mimeTypes[extname] || "application/octet-stream";
    
    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === "ENOENT") {
                fs.readFile(__dirname + "/404.html", function (error, content) {
                    res.writeHead(404, {
                        "Content-Type": "text/html"
                    });
                    res.end(content, "utf-8");
                });
            } else {
                res.writeHead(500);
                res.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
            }
        } else {
            res.writeHead(200, {
                "Content-Type": contentType
            });
            res.end(content, "utf-8");
        }
    });

}).listen(3000);




