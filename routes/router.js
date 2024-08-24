const express = require('express');
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");

// get productdata api
router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata = await Products.find();
        // console.log("Console the data"+productsdata);
        res.status(201).json(productsdata);
    } catch (error){
        console.log('error',error.message);
    }
})

// get individual data
router.get("/getproductone/:id",async(req,res)=>{
    try{
    const {id} = req.params;
    // console.log(id);
    const individualdata = await Products.findOne({id:id})
    // console.log(individualdata+"individual data");
    res.status(201).json(individualdata)
    }catch(error){
        res.status(400).json(individualdata);
        console.log("error"+error.message);
        
    }
});

// register data
router.post("/register", async (req, res) => {
        const { name, email, mobile, password, confirmpassword } = req.body;
        console.log("Request Body:", req.body); // Log request body

        if (!name || !email || !mobile || !password || !confirmpassword) {
            res.status(422).json({ error: "Fill all the data" });
            console.log("no data available");
            
        }
        try{
        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "Email already exists" });
        }else if (password !== confirmpassword) {
            res.status(422).json({ error: "Password and confirm password should be the same" });
        }else{
            const finalUser = new USER({
                name,email,mobile,password,confirmpassword
        });
        const storedata = await finalUser.save();
        console.log("Stored User Data:", storedata); // Log stored user data
        res.status(201).json(storedata);
        }
    }catch(error){
        console.log("error",error.message);
    }
});

//Login user api

// Login user API without password encryption
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
        return res.status(400).json({ error: "Fill all the data" });
    }

    try {
        // Find the user by email
        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin);

        if (userlogin) {
            const isMatch = password === userlogin.password;
            console.log('Password match result:', isMatch);

            if (!isMatch) {
                return res.status(400).json({ error: "Password Not Match" });
            } else {
                return res.status(200).json({userlogin});
            }
        } else {
            return res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;