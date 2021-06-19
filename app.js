const express = require('express');
const app= express();
const path= require('path');
const mongoose= require('mongoose');
const User= require('./models/users');
const methodOverride= require('method-override');

mongoose.connect('mongodb://localhost:27017/internshipUser', {useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
.then(()=>{
   console.log("connection open");
})
.catch((err)=>{
   console.log(err);
})


app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('over'));

app.get('/user',async (req,res)=>{
    const users=await User.find({})
    res.render('index', {users});
})
app.get('/user/new', (req,res)=>{
    res.render('new');
})
app.get('/user/:id', async (req,res)=>{
    const {id}= req.params;
    const user=await User.findById(id);
    res.render('show',{user});
})
app.post('/user',async (req,res)=>{
    const user= new User(req.body);
    await user.save();
    res.redirect('/user');
})
app.get('/user/:id/edit',async (req,res)=>{
    const {id}= req.params;
    const user= await User.findById(id)
    res.render('edit',{user});
})
app.put('/user/:id',async (req,res)=>{
    const user= await User.findByIdAndUpdate(req.params.id, req.body, {runValidators:true });
    res.redirect(`/user/${user._id}`);
})
app.delete('/user/:id',async (req,res)=>{
    const {id}= req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/user');
})


app.listen(3000,()=>{
    console.log("App is being served on port 3000");
})