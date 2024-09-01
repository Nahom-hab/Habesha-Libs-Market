import { errorHandeler } from "../utils/ErrorHandler.js";
import Product from "../models/productModel.js";

// Post a new product
export const postProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

// Get a single product by ID
export const getProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            errorHandeler(404, 'Product with this ID not found');
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        next(errorHandeler(500, 'Internal server error'));
    }
};

// Get all products
export const getAllProducts = async (req, res, next) => {
    try {
        const allproducts = await Product.find();
        if (allproducts) {
            res.status(200).json(allproducts);
        }
    } catch (error) {
        next(error);
    }
};

// Update a product by ID
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );
                if (!updatedProduct) {
                    return next(errorHandeler(404, 'Updated product not found'));
                } else {
                    res.status(200).json(updatedProduct);
                }
            } catch (error) {
                next(error);
            }
        }
    } catch (error) {
        next(error);
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(errorHandeler(404, 'Product not found'));
        } else {
            try {
                await Product.findByIdAndDelete(req.params.id);
                res.status(200).json('Product deleted successfully');
            } catch (error) {
                next(error);
            }
        }
    } catch (error) {
        next(error);
    }
};

// Search products by tags or similar terms
export const searchProduct = async (req, res, next) => {
    const searchTerm = req.query.q;
    try {
        const products = await Product.find({
            $or: [
                { tags: { $regex: searchTerm, $options: "i" } },
                { name: { $regex: searchTerm, $options: "i" } }
            ]
        });
        if (products.length === 0) {
            return next(errorHandeler(404, 'No products found matching your search term'));
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        next(errorHandeler(500, 'Internal server error'));
    }
};
