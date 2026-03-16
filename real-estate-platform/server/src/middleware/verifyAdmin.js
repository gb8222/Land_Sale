import { auth } from "../config/firebaseAdmin.js";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",") : ["admin@gmail.com"];

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    
    if (ADMIN_EMAILS.includes(decodedToken.email)) {
      req.user = decodedToken;
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Admin access only" });
    }
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};