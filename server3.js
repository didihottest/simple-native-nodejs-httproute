const express = require('express');
const app = express();
const fs = require("fs")
const os = require("os");
const totalmem = os.totalmem();
const cpuSpec = os.cpus();

app.use(express.static(__dirname));

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

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/cpuinfo", function (req, res) {
    res.sendFile(__dirname + "/cpuinfo.html");
    
});

app.post("/cpuinfo", function(req, res){

    fs.readFile(__dirname + "/json/cpu.json", function (err, data) {
        if (err) throw err;
        let cpuinfo = data.toString('utf-8');
        cpuinfo = JSON.parse(cpuinfo);
        res.send(cpuinfo);
    });
});

app.get("/meminfo", function (req, res) {
    res.sendFile(__dirname + "/meminfo.html");
});

app.post("/meminfo", function(req, res){

    fs.readFile(__dirname + "/json/meminfo.json", function (err, data) {
        if (err) throw err;
        let meminfo = data.toString('utf-8');
        meminfo = JSON.parse(meminfo);
        res.send(meminfo);
    });
});

app.listen(3000, function () {
    console.log("server started at port 3000");
});