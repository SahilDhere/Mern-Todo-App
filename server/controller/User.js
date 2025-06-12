const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {

        const { name, password } = req.body;

        if (!name, !password) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

        const user = await User.findOne({ name });

        if (user) {
            return res.status(400).json({ message: "Username is already present" })
        }

        const hashpwd = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name, password: hashpwd
        })

        const token = jwt.sign({ name, id: newUser._id }, process.env.SECRET_KEY);

        return res.status(200).json({
            message: "Account create Succedfully",
            token,
            user: newUser
        })

    } catch (error) {
        console.error({ message: "Failed to create Account ", error: error.message })
    }
}

const login = async (req, res) => {
    try {

        const { name, password } = req.body;

        if(!name || !password){
            return res.status(400).json({
                message:"Username and Password are required for Login"
            })
        }

        const user = await User.findOne({ name });

        if (user && await bcrypt.compare(password, user.password)) {
            let token = jwt.sign({ name, id: user._id }, process.env.SECRET_KEY);

            return res.status(200).json({
                message: "Login User Succesfully",
                token,
                user
            })
        } else {
            return res.status(400).json({ message: "Enter a correct Username and Password" })
        }

    } catch (error) {
        console.error({ message: "Failed to create Account ", error: error.message })

    }
}

module.exports = { signUp, login };