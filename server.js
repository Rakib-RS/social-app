const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyparser = require("body-parser");
const passport = require("passport");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const port = process.env.PORT || 5000;

//DB config
const db = require("./configure/key").mongoURI;

//connect to mongoose

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));
const ref = mongoose.Collection;
//passport middleware
app.use(passport.initialize());

//passport config
require("./configure/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts/", posts);
app.listen(port, () => {
  console.log(`server is running from ${port}`);
});
