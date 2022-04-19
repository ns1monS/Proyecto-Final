const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function conectar(){
    await client.connect();
}
function logError(e) {
    console.log(e)
}

function find(baseDatos, collection , filtro, execute , callback , error) {
    client  
        .db(baseDatos)
        .collection(collection)
        .find(filtro)
        .forEach(execute)
        .then(callback)
        .catch(error)
}

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json())

app.get("/Lenguaje" , function (req, res){
    conectar();
    let posts = [];
    find(
        "Proyecto-Final-Releevant",
        "post",
        {Lenguaje: { $in: ["JS"] }},
        (Post) =>{
        console.log("prueba 1: ", Post.Lenguaje , Post.Usuario );
        posts.push(Post.Lenguaje , Post.Usuario);
        },
        function () {
            res.send(posts);

        },
        logError
    );
})





const PORT = 8080;
app.listen(PORT, () => {
    console.log(`iniciando en el puerto ${PORT}`)
})