import express from 'express';
import User from '../model/user.js';

const Router = express.Router();

Router.post('/register' , async(req,res) => {
    const {formData} = req.body;
    const {username,email,password} = formData;
    try{
         const user = new User({username:username,email:email});
         const regiteredUser = await User.register(user,password);
         res.status(200).send(regiteredUser);
    } catch (e) {
        console.log('error registering new user')
        res.status(500).send('error creating a new user')
    }
})

export default Router;