// import { Jwt } from "jsonwebtoken";
import User from "../models/User.js"
import bcrypt from "bcrypt";

export const register = async (req, res) =>
{
    try
    {

        const { firstName,
            lastName,
            email, password,
            picturePath, firends, location, occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email, password : passwordHash,
            picturePath , firends : firends ? firends : 1, location, occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
 })
        const savedUser = await newUser.save();
      return  res.status(201).json(savedUser)

    } catch (err)
    {
        res.status(500).json({ error: err.message })
    }
}


