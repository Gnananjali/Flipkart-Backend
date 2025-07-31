const mongoose = require("mongoose");
const express = require("express");
const { count } = require("console");
const router = express.Router();

const Cart=mongoose.model('Cart',new mongoose.Schema({
    userId:String,
    items:[
        {
            productId:String,
            quantity:Number
        }
    ]
}));

router.post('/cart/add',async(req,res)=>{
    try{
        const {productId, quantity=1,user} = req.body;

        if(!productId || !user) {
            return res.status(400).json({message:"Productid and user is required"});
    }

    let cart=await Cart.findOne({userId:user,status:'active'});

    if(!cart){
        cart=new Cart({userId:user,items:[],status:'active'});
    }
    const existingItemIndex=cart.items.find(item=>item.productId===productId);

    if(existingItemIndex>-1){
        cart.items[existingItemIndex].quantity+=parseInt(quantity);
    }else{
        cart.items.push({
            productId,
            quantity:parseInt(quantity)
        });
    }
    cart.updateAt=new Date();
    await cart.save();
    }catch (err) {
        res.status(500).json({error:"Internal server error,Item has not been added"});
    }
});

router.get('/cart',async(req,res)=>{
    try{
        const carts=await Cart.find({});

        res.status(200).json({
            success:true,
            count: carts.length,
            data: carts
        })
    
    }catch (error) {
        console.log("Error fetching cart",error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch carts",
            error:error.message,
        });
    }
});

//Delete route-assignment

//router.delete("/cart/:id", async (req, res) => {