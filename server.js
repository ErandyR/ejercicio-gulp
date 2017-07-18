var express = require("express");
var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, () => {
    console.log("listening on 3000");
});