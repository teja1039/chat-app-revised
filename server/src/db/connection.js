
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://krishnatejachilukuri:JL6ay6jxIdn8rzUW@cluster0.5aic5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDB(dbName) {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db(dbName);
  } catch(err) {
    throw new Error("Unable to connect to mongodb");
  }
}

const db = await connectToDB("chat_app");
export default db;