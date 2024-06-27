const express = require("express");
const cors =require("cors");
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.use(cors());

app.use(express.json())
// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/DBLP?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => console.log('Connecté à la base de données MongoDB'));
//shemas

const publiSchema = new mongoose.Schema({
  _id: String,
  type: String,
  title: String,
  pages: Object,
  year: Number,
  booktitle: String,
  url: String,
  authors: [String]
});

const publis = mongoose.model('publis', publiSchema);




app.get("/data", async (req, res) => {
  try {
    const data = await publis.distinct({type:'Book'}); 
    res.json(data);
} catch (error) {
    res.status(500).json({ error: 'error' });
}
});

app.listen(PORT, () => {
  console.log(`Backend express server is running on port ${PORT}.`);
});