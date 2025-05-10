import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import db from './db.js';


const app = express();
const PORT =  process.env.PORT || 5003;

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Tell express to serve all files from the public folder as static assets / files.
// Any requests for the css files will be resolved to the public folder.
app.use(express.static(path.join(__dirname, '../public'))); 

// Serving up the HTML from the /public directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});