const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');


//middlewares
app.use(cors());
app.use(express.json());



//mongoose connections
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log('Connected to MongoDB');
}).catch((err)=>{
  console.log('Failed to connect to MongoDB',err);
})

//import routes 
const UserRouter = require('./routes/User.route');
const RequestRouter = require('./routes/Request.route');



//routes
app.use('/api/users',UserRouter)
app.use('/api/requests', RequestRouter)


//starting the server
const port = process.env.PORT || 5001;
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})

