import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exist."});

        const result = await User.create({ firstName, lastName, email, password, username: Math.random().toString() });
        res.status(201).json({message: "User Created."});
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});
        const correctUser = await existingUser.authenticate(password);
        console.log(correctUser);
        if(correctUser && existingUser.role === "user")
        {
            const token = jwt.sign({ _id: existingUser._id, role: existingUser.role}, process.env.SECRET_KEY, { expiresIn: "1h"});
            const {_id, firstName, lastName, email, role, fullName} = existingUser;
            res.status(200).json({token, user: {_id, firstName, lastName, email, role, fullName}});
        }
        else
            res.status(400).json({message: 'Invalid Credentials.'});
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
    }
}
