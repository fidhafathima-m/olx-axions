import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import User from './models/User.js';
import Product from './models/Product.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.post('/api/signup', async (req, res) => {
    const userData = req.body;
    if(!userData.name || !userData.email || !userData.password || !userData.phone) {
        return res.status(406).json({success: false, message: 'All fields are required'});
    }
    try {
      const existingUser = await User.findOne({email: userData.email});
      if(existingUser) {
        return res.status(406).json({success: false, message: 'Email id already exists. Please login'});
      }
        const newUser = new User(userData);
        await newUser.save();
        
        return res.status(201).json({
            success: true,
            data: {
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            },
            message: 'Signup successful'
        });
    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({success: false, message: 'Server Error'});
    }
});

app.post('/api/login', async (req, res) => {
    const userData = req.body;
    if(!userData.email || !userData.password) {
        return res.status(406).json({success: false, message: 'Email and password are required'});
    }
    try {
        const user = await User.findOne({email: userData.email});
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        if (user.password !== userData.password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        return res.status(200).json({ 
            success: true, 
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            message: "Login successful" 
        });

    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({success: false, message: 'Server Error'});
    }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.error("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" })
  }
});

app.post("/api/products", async (req, res) => {
  const productData = req.body;

  if (!productData.name || !productData.category || !productData.image || !productData.price || !productData.sellerName || !productData.sellerPhone) {
    return res.status(406).json({ success: false, message: "All product fields are required" });
  }

  try {
    const newProduct = new Product({
      ...productData
    });
    await newProduct.save();
    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully"
    });
  } catch (error) {
    console.error("Error in creating product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/products/my-ads", async (req, res) => {
  try {
    const { sellerPhone } = req.query;
    
    if (!sellerPhone) {
      return res.status(400).json({ success: false, message: "Seller phone is required" });
    }
    
    const products = await Product.find({ sellerPhone });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching user products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { name, category, price, image } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, image },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: updatedProduct, message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});



app.listen(5000, () => {
    connectDB();
    console.log('Backend server started at http://localhost:5000'); 
});