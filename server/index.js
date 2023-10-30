const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.8sitard.mongodb.net/?retryWrites=true&w=majority`;


//middleware

app.use(cors());
app.use(express.json());

//database connection with mongodb

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    //DB Collections

    const database = client.db("quickcheckin");
    const roomsCollection = database.collection('rooms');

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//checking connections

app.get("/", (req, res) => {
  res.send("WELCOME TO QUICKCHECKIN SERVER");
});

app.listen(port, () => {
  console.log("app server is running on port : ", port);
});
