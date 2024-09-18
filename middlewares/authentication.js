const jwt = require("jsonwebtoken");
const httpstatus = require("http-status-codes");
const secret_key = "hilal_enelsis";

function authentication(req,res,next) {
    try {
        const jwttoken=req.headers.authorization;
        if(!jwttoken)
        {
            throw "oturum açılamadı";
        }
        
        try {
            const jwtCheck=jwt.verify(jwttoken,secret_key);
            req.user = jwtCheck;
            next();
        } catch (error) {
            throw "oturum açılamadı";
        }
        

    } catch (error) {
          res.status(httpstatus.StatusCodes.UNAUTHORIZED).json({message: "Oturum bulunamadı. Middleware'den geçemedi."});
    }
}


module.exports = { authentication };