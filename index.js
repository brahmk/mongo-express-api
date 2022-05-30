const mongo = require("mongodb").MongoClient;
const express = require("express");



const app = express();
app.use(express.json());

const url = "mongodb+srv://admin:Password1@cluster0.xks18.mongodb.net?retryWrites=true&w=majority"



const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let menudb, customersdb, db;

mongo.connect(url, options, (err, mongoClient) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected!");
  db = mongoClient.db("restaurant");
  customersdb = db.collection("customers");
  menudb = db.collection("menu");
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log("Now listening on http://localhost:" + PORT);
});

app.get("/mongo", async (req, res)  =>  {
    results =  await menudb.find({}).toArray();
    
  return res.status(200).send(results); 
});

app.post("/mongo", (req, res) => {  
  menudb.insertOne(req.body);
  return res.status(201).send('Item Added')
});

app.delete("/mongo", (req,res)=>{
    
    menudb.deleteOne({name: req.body.name})
    .then( () => res.send('item deleted!'))
})

app.patch("/mongo", (req,res)=>{
    
    menudb.updateOne({name: req.body.name}, {$set:req.body})
    .then( () => res.send('item updated!'))
})