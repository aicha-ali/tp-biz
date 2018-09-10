//Contr
const database = require("./database");
const express = require("express");
//framework standard de node.js pour avoir avoir accès à des méthodes
const app = express();
const path = require('path');
const port = 7777;
//on veut se connecter sur le port 5555
app.use(express.json({extended : false}));
app.use(express.static(__dirname + "/public", {
  extensions: ["html"]
}));
//database.test();
//app.get()

app.post("/prod", function(req, res){
  console.log("user envoyé");
  console.log(req.body);
  database.createProducts((dataset) => {
    res.send(dataset);
  }, req.body); //post datas ici ...
});


app.get('/prod', function(req, res){
  database.getProducts(null, prod => {  //nous définissons notre fonction clbk appelé dans database
    res.send(prod);
    //nous demandons dans cette fonction users
  });
});

app.listen(port, () => {
  console.log(port + " vous écoute");
  console.log("ha");
});
