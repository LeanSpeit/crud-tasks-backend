const express = require('express');
const cors = require('cors');

const app = express();


//Middleware
app.use(express.json());
app.use(cors())
app.use(require("./src/routes/routes"))


app.listen(3000, ()=>{
    console.log("servidor funcionando en el puerto 3000");
})


