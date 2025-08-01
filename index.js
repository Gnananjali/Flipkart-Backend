const express=require("express");
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require("body-parser");

const { router: authRoutes, authenticateJWT } = require("./auth");
const cartRoutes = require("./cart");

const app=express();
const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String // optional field for image URL
}));
app.use(cors());
app.use(bodyParser.json());

//const {router:authRoutes,authenticateJWT}=require("./auth");
//const cartRoutes=require("./cart");

app.use(authRoutes);
app.use(cartRoutes);

mongoose.connect("mongodb+srv://gnananjalikavali123:60sXil0Ftj9GpbdN@cluster0.iwh3sr9.mongodb.net/ecommerce",{useNewUrlParser:true,useUnifiedTopology:true});

app.get("/products",async(req,res)=>{
  try{
  const products = await Product.find();
  res.json(products);
}catch(error){
  res.status(500).json({error:"There is iinternal server error"});
}
});

app.get('/products/:id',async(req,res)=>{
  try{
    const product=await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({message:"The items that you were searching for does not exist"});
    }else{
      res.json(product);
    }
  }catch(error){
    res.status(500).json({error:"There is an internal server error"});
  }
});

app.listen(8080,()=>{
  console.log("Server is running on port 8080");
});
