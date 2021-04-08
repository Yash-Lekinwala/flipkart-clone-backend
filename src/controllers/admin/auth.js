import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "Admin User already exist."});

        const hash_password = await bcrypt.hash(password, 10);
        const result = await User.create({ firstName, lastName, email, hash_password, username: Math.random().toString(), role: "admin" });
        res.status(201).json({message: "Admin User Created."});
        
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
        if(correctUser && existingUser.role === 'admin')
        {
            const token = jwt.sign({ _id: existingUser._id, role: existingUser.role}, process.env.SECRET_KEY, { expiresIn: "1d"});
            const {_id, firstName, lastName, email, role, fullName} = existingUser;
            res.cookie('token', token, {expiresIn: '1d'});
            res.status(200).json({token, user: {_id, firstName, lastName, email, role, fullName}});
        }
        else
            res.status(400).json({message: 'Invalid Credentials.'});
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
    }
}

export const signout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Signout successfully.'});
}

