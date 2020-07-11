const express = require("express")
const app = express()
const databaseConnect = require("./config/databaseConnect")


// API client
const StudentAPI = require("../NODEJS/Route/API/StudentAPI")
const ClassAPI = require("../NODEJS/Route/API/ClassAPI")
const ClassDetailAPI = require("../NODEJS/Route/API/ClassDetailAPI")

databaseConnect();

const PORT = process.env.PORT || 3000
app.use('/uploads',express.static('uploads'));
app.use(express.json({ extended : false}));

app.use("/api/student", StudentAPI)
app.use("/api/class", ClassAPI)
app.use("/api/classDetail", ClassDetailAPI)


app.get("/", (req, res)=>{
    return res.send("Server đang chạy ... ");
})

app.listen(PORT, (req,  res)=> console.log("Server started nha "+ PORT));