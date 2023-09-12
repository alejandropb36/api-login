import jwt from "jsonwebtoken";

export const generateJWT = (id, email, name) => {
    return jwt.sign({id, email, name }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

export const validateJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};