const express = require('express');
const app = express();
const fs = require("fs")
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/cpuinfo", function (req, res) {
    res.sendFile(__dirname + "/cpuinfo.html");
    let currentCpuInfo = fs.readFile(__dirname + "/json/cpu.json", function (err, data) {
        if (err) throw err;
        let cpuinfo = data;
        return cpuinfo;
    });
    console.log(currentCpuInfo);
    // currentCpuInfo = JSON.parse(currentCpuInfo);
    // // document.getElementById(".cpuinfo").innerHTML()
    // console.log(currentCpuInfo);

});

app.get("/meminfo", function (req, res) {
    res.sendFile(__dirname + "/meminfo.html");
});

app.listen(3000, function () {
    console.log("server started at port 3000");
});