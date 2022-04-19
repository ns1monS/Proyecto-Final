const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");

app.get("/names", function (request, response) {
    response.set("Access-Control-Allow-Origin", "*");
    MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
      if (err) throw err;
  
      let database = client.db("Proyecto-Final-Releevant");
  
      database
        .collection("usuarios")
        .find()
        .toArray((err, results) => {
          if (err) throw err;
  
          results.forEach((value) => {
            console.log(value.username);
          });
          response.json(results);
        });
    });
  });


  //  Sacar todos post con Lenguaje JS
app.get("/busca/:Lenguaje/JS", function (request, response) {
    response.set("Access-Control-Allow-Origin", "*");
    let Lenguaje = request.params.Lenguaje;
    MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
      if (err) throw err;
  
      let database = client.db("Proyecto-Final-Releevant");
  
      database
        .collection("post")
        .find({ "Lenguaje": Lenguaje })
        .toArray((err, results) => {
          if (err) throw err;
  
          results.forEach((value) => {
            console.log(value.Lenguaje);
          });
          response.json(results);
        });
    });
  });



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`iniciando en el puerto ${PORT}`)
})