const express = require('express');
require('dotenv').config();
const connectDB = require('./Middleware/DB');
const port = process.env.PORT || 6000;
const cors = require('cors');
const sectionRoutes = require('./Routes/Sections')
const testRoutes = require('./Routes/Tests')



const app = express();

app.use(express.json());


const corsOptions = {
  origin: ["http://localhost:3000","https://form-builder-frontend-phi.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.get('/', (req, res) => {
  res.json("FormBuilder Api");
});

app.use('/api/sections', sectionRoutes);
app.use('/api/tests', testRoutes);


app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
