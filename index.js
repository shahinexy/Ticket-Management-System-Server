const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

//middlewear
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.76h69in.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


    const userCollection = client.db("TicketManagment").collection("userData");

    // User data 
    app.post("/user", async (req, res) =>{
      const newUser = req.body;
      const query = {userEmail: newUser.userEmail}
      const isExist = await userCollection.findOne(query)
      if(isExist){
        return res.send({ message: 'user already Exist', insertedId: null})
      }
      const result = await userCollection.insertOne(newUser);
      res.send(result)
      console.log('user post success');
    })

    app.get('/allUser', async (req, res) =>{
      const result = await userCollection.find().toArray();
      return res.send(result)
    })

    app.get('/allUser/:id', async (req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.findOne(query);
      return res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) =>{
    res.send('Ticket-Management-System-Server is running')
})

app.listen(port, ()=>{
    console.log(`Ticket-Management-System-Server is running on port ${port}`);
})