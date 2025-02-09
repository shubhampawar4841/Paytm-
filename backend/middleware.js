const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const authmiddleware = async (req, res, next) => {
    const token=req.header("Authorization");
    if(!token){
        return res.status(401).json({
            message:"No token provided"
        })
    }try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized"
        })        
    }
}

module.exports=authmiddleware;

