import type {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/User.js";

const saltRounds : number = 10;

const hashPassword = async (password : string) : Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
}   

const comparePassword = async (password : string, hash : string) : Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

const secret = process.env["PRIVATE_KEY_JWT"];
if (!secret) {
    throw new Error("JWT secret not found");
}

const generateToken = async (userId : string) : Promise<string> => {
    return jwt.sign({userId: userId}, secret, {expiresIn: "4minutes"});
}   

export async function register(req: Request, res: Response) {
    try {
      const {name, email, password} = req.body as {
        name : string;
        email : string;
        password : string;
      }
      if (!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
      }

      const existing = await User.findOne({email});
      if (existing){
        return res.status(400).json({message: "Email already registered"});
      }
      const hashedPassword = await hashPassword(password);

      const user = await User.create({name, email, password: hashedPassword});

      return res.status(201).json({message: "User registered successfully", user:{
        id: user._id.toString(),
      }});

    } catch(error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}


export async function login(req: Request, res: Response) {
    try {
      const {email, password} = req.body as {
        email: string,
        password: string,
      }

      if (!email || !password){
        return res.status(400).json({message: "All fields are required"});
      }

      const user = await User.findOne({email});
      if (!user){
        return res.status(401).json({message: "Invalid credentials"});
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid){
        return res.status(401).json({message: "Invalid credentials"});
      }

      const accessToken = await generateToken(user._id.toString());

      return res.status(200).json({message: "User logged in successfully", accessToken: accessToken, user: {
        id: user._id.toString(),
      }});

    }catch(error) {
        console.error("Login error:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


export default {register, login};