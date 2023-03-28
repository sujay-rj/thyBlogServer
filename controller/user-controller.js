import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async(request, response) => {



    try {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const user = { name: request.body.name, username: request.body.username, password: hashedPassword };
        const newUser = new User(user);
        const res = await newUser.save();
        response.status(200).json({ msg: 'signup successfull' });
    } catch (error) {
        // console.log(error);
        response.status(500).json({ msg: 'Error while signup the user' });
    }
}


export const loginUser = async(request, response) => {
    let user = await User.findOne({ username: request.body.username });
    // console.log(request.body.username);
    if (!user) {
        return response.status(400).json({ msg: 'User name does not match' });
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });
        } else {
            response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Login failed' });
    }
}