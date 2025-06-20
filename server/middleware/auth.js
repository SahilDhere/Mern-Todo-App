const jwt = require('jsonwebtoken')

const auth = async(req , res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Token are not provided"})
    }
    try {

        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(403).json({message:"No Token mattched"})
    }
}

module.exports = auth