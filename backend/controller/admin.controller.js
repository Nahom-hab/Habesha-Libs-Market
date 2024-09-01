import { errorHandeler } from "../utils/ErrorHandler.js"
import Admin from "../models/AdminModel.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { fullname, username, password } = req.body
    const hashedpassword = bcryptjs.hashSync(password, 10)
    const newAdmin = new Admin({ fullname, username, password: hashedpassword })
    try {
        await newAdmin.save()
        res.status(200).json('user created succsusfully')
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const validUser = await Admin.findOne({ username })
        if (!validUser) return next(errorHandeler(404, 'Admin not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return (next(errorHandeler(401, 'wrong credintials')))
        const token = jwt.sign({ id: validUser._id }, process.env.SECRET)

        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(validUser._doc)

    } catch (err) {
        next(err)
    }

}
