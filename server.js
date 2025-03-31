const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    const extname = path.extname(filePath);
    let contentType = "text/html";  
    switch (extname) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        case ".jpeg":
            contentType = "image/jpeg";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".svg":
            contentType = "image/svg+xml";
            break;
        case ".json":
            contentType = "application/json";
            break;
        default:
            contentType = "text/html";
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                // File not found
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not Found");
            } else {
                // Other server error
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            }
        } else {
            // Serve the file with the correct content type
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

// Server listening to port 3000
server.listen(3000, () => {
    console.log("Server is Running on http://localhost:3000");
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://robbie1:Boybuster_03@cluster0.gdyalco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);