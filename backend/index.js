const express=require("express");
const app=express();
const rootRouter = require("./routes/index");
const cors = require("cors");
const authmiddleware = require("./middleware");

app.use(authmiddleware);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",rootRouter);



app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});