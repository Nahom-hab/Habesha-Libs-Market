

import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nameAMH: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    ViewCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    descriptionAMH: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true
    },
    discountedPercent: {
        type: Number,
        required: true
    },
    imageURLs: {
        type: Array,
        required: true
    }

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product