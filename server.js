const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

//DB config
const db = require('./configure/key').mongoURI;

//connect to mongoose

mongoose
.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log('mongodb connected')
)
.catch(err => console.log(err)
)
const ref = mongoose.Collection;
app.get('/',(req,res)=>
    res.send("hello server 11111 12")
)
app.listen(port,()=>{
    console.log(`server is running from ${port}`);
    
})