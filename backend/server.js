const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const taskRoutes = require('./routes/tasks')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);
mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connected to mongodb')
})
.catch((error)=>{
    console.log('error connecting')
})
const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})