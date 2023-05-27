import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.json("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.json("Invalid token");
    }
    req.user = decoded;
    return next();
  });
};
