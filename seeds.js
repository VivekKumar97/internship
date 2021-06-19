const mongoose= require('mongoose')
const User= require('./models/users');

mongoose.connect('mongodb://localhost:27017/internshipUser', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
   console.log("connection open");
})
.catch((err)=>{
   console.log(err);
})

const user= new User({
    name:'Vivek Singh',
    age: 22,
    gender:'male',
    email:'abc@gmail.com'
})
user.save().then(p=>{
    console.log(p)
})
.catch(err=>{
    console.log(err);
})