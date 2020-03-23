const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

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
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts/',posts);
app.listen(port,()=>{
    console.log(`server is running from ${port}`);
    
})