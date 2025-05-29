import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerPhone: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;