
import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request{
   userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction){
   try {
     const header = req.headers["authorization"];
     if (!header || !header.startsWith("Bearer ")) {
         return res.status(400).json({error:"Authorization header is missing or invalid"});
     }
     const token = header.slice("Bearer".length).trim();
     const secret = process.env["PRIVATE_KEY_JWT"];
     if (!secret){
        return res.status(500).json({message:"Internal server error"});
     }
     const payload = jwt.verify(token, secret) as {userId: string};
     req.userId = payload.userId;
     return next();
    }catch(err){
      console.error("Authorization failed:", err);
      return res.status(401).json({message:"Authorization failed"});
    }
}

export default requireAuth;
