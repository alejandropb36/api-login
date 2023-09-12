import { validateJWT } from "../helpers/jwt.helper.js";
import { Bearer } from "../models/Auth.js";
import { User } from "../models/User.js";

const checkAuth = async (req, res, next) =>{
    let token = undefined;

    if(req.cookies.AUTH_TOKEN && req.cookies.AUTH_TOKEN !== '') {
        token = req.cookies.AUTH_TOKEN;
    }

    if(!token && req.headers.authorization && req.headers.authorization.startsWith(Bearer)){
        token = req.headers.authorization.split(" ")[1];
    }
    
    try{
        const decoded = validateJWT(token);

        const user = await User.findByPk(decoded.id);

        if(user === null) {
            return res.status(401).json({
                msg: "Unauthorized token"
            });
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        
        return next();

    }catch(error){
        console.error(error);
        return res.status(401).json({
            msg: "Unauthorized token"
        });
    }

    if(!token){
        const error = new Error("Token not found");
        return res.status(403).json({msg: error.message});
    }

    next();
}

export default checkAuth;