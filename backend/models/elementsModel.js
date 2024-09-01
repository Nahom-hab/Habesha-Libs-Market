import mongoose from "mongoose"

const ElementSchema = mongoose.Schema({
    titleLine1: {
        type: String,
        required: true
    },
    titleLine2: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    telegram: {
        type: String,
        required: true
    },
    shopAddress: {
        type: String,
        required: true
    },
    discountText: {
        type: String,
        required: true
    },
    discountDesc: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDesc: {
        type: String,
        required: true
    },
    productDesc2: {
        type: String,
        required: true
    },
    productTitle2: {
        type: String,
        required: true
    },
    advertizeIMG: {
        type: String,
        required: true
    },
    discriptionimg1: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Element = mongoose.model('Element', ElementSchema)

export default Element

