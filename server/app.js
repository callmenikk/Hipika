const express = require('express');
const app = express();
const userAuth = require('./routes/log/signup')
const Login = require('./routes/log/login')
const getUser = require('./routes/dashboard/getUser')
const uploadBlog = require('./routes/blogs/uploadBlog')

const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json()) 

const dbURL = 'mongodb+srv://callmenikk:polisjoxi0@cluster0.dvs5k.mongodb.net/blog-mongodb?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser: true })
.then(() => {
    console.log("connected to mongoDB")
})
.catch(err => console.log(err))

app.use('/', userAuth)
app.use('/', Login)
app.use('/dashboard', getUser)
app.use('/blog', uploadBlog )
 
app.listen(5000)