const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://brijesh:brijesh@cluster0.qe9bgqk.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log(`Successfully connected wiht Db`)
}).catch((err)=> console.log(err))