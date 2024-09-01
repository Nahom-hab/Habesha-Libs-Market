import mongoose from "mongoose"

const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin