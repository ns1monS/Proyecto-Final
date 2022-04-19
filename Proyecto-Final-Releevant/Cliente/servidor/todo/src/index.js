require('dotenv').config()

const app = require('./server')
require('./database');


app.get("/", function (request, response) {
    MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
      if (err) throw err;
  
      let database = client.db("Proyecto-Final-Releevant");
  
      database
        .collection("amistades")
        .find()
        .toArray((err, results) => {
          if (err) throw err;
  
          results.forEach((value) => {
            console.log(value);
          });
          console.log(response.json(results));
          
        });
    });
    
  });

  


app.listen(3000), () => {
    console.log("escuchando en el puerto",3000)
}
