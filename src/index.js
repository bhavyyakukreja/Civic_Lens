const express=require("express");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const routes = require("./routes/chatRoutes");


app.use('/api',routes);


app.listen(process.env.PORT,()=>{
    console.log("server started",process.env.PORT);
})
