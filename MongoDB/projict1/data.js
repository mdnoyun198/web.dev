import { MongoClient } from "mongodb";

const uri = "mongodb+srv://startwork:bM2tsdq-_nqRFKs@cluster0.vqim0qw.mongodb.net/";
const client = new MongoClient(uri);

async function run() {
  try {
    // 1. Connect to MongoDB
    await client.connect();

    // 2. Select the Database and Collection
    const database = client.db("Test");
    const collection = database.collection("new");

    // 3. Fetch all documents from the collection
    const documents = await collection.find({}).toArray();
    
    // 4. Print the data to the console
    console.log("\n================ POPULATED DATA ================");
    console.dir(documents, { depth: null }); 
    console.log("================================================\n");

  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    // 5. Close connection
    await client.close();
  }
}

run();