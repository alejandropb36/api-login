import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { User } from "../models/User.js";
import { AUTH_TOKEN } from "../models/Auth.js";
import { generateJWT } from "../helpers/jwt.helper.js";

export const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({
        where: { email: email }
    });

    if (user === null) {
        const message = `User: ${email} notfound`
        console.log(message);
        return res.status(404).json({message: message})
    }

    if(!await bcrypt.compare(password, user.password)) {
        const message = `Invalid credentials`
        console.log(message);
        return res.status(403).json({message: message})
    }
    
    const jwt = generateJWT(user.id, user.email, user.name);

    res.cookie(AUTH_TOKEN, jwt, {
        // 30 days
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: 'lax'
    });
  
    return res.json({
        message: 'Successful login',
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        token: jwt
    });
      
  } catch(error) {
    console.error(error);
    return res.status(500).json({message: error.message});
  }
};

export const register = async (req, res) => {

    try {
        const { id, name, email, password, birthDate } = req.body;
      
        const user = await User.findOne({
          where: {
            [Op.or]: [{ id: id }, { email: email }],
          },
        });
      
        if (user !== null) {
          const error = new Error("User already exists");
          console.error(error);
          res.status(400);
          return res.json({ message: error.message });
        }
      
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
      
        const newUser = await User.create({
          id,
          name,
          email,
          password: newPassword,
          birthDate,
        });
      
        return res.json({
          message: "User created successfully",
          user: { id: newUser.id, email: newUser.email, name: newUser.name},
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
};

export const getProfile = (req, res) => {
  res.json({ message: "Successful authentication", user: req.user });
};

export const logout = (req, res) => {
    res.clearCookie(AUTH_TOKEN);

    res.json({ message: "Successful logout" });
}
