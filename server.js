require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const app = express();
const PORT = 3000;

const userModel = require('./models/User.js')

let publicPath = path.join(__dirname,'public');

app.use(express.static(publicPath)); //we use this to load files in express.
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL).then(console.log("connected to database"));


app.get('/login', (req, res) => {
    try {        
        res.sendFile(path.join(publicPath, 'index.html'));

    } catch (error) {
        console.error("Error in the route:", error);
        res.status(500).send("Internal server error");
}
});

app.post('/registeruser', async (req, res) => {

    const {name, username, email, password, repassword} = req.body;

    var usernameExists = await userModel.exists({username: username})
    var emailExists = await  userModel.exists({email: email})

    if (usernameExists) {

        return res.json({success: false, message:"Username already exists, choose a different username."})
        
    }

    else if (emailExists) {

        return res.json({success: false, message:"Email already exists, choose a different email."})

    }
    
    userModel.create({
        
        name : name,
        username: username,
        email: email,
        password: password

    })
    return res.json({success: true, message:"User registered successfully!"})


})

app.post('/checklogin', async (req, res) => {

    const { username, password } = req.body;   
    
    var userExists = await userModel.exists({username: username})
    var passMatch = await userModel.findOne({password:password})
    if (userExists) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }

    const isValidUser = username === "testuser" && password === "testpassword"; // Example check


});


app.get('/register', (req, res) => {

    try {
        res.sendFile(path.join(publicPath, "registration.html"))
    } catch(error) {
        console.log("Error in the route:", error)
    }

})




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
