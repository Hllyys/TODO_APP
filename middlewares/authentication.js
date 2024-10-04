const jwt = require("jsonwebtoken");
const httpStatus = require("http-status-codes");
const secret_key = "hilal_enelsiss";

function jwtAuthentication(req, res, next) {
    try {
        const jwttoken = req.headers.authorization;
       
        if (!jwttoken) {
            return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                message: "Oturum açılamadı. Token bulunamadı."
            });
        }

        const token = jwttoken.split(" ")[1];
      

        if (!token) {
            return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                message: "Oturum açılamadı. Geçersiz token formatı."
            });
        }
        
        console.log("Token:", token);

        jwt.verify(token, secret_key, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                        message: "Token süresi dolmuş."
                    });
                } else {
                    console.error("Token doğrulama hatası:", err); 
                    return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                        message: "Geçersiz token."
                    });
                }
            }

            req.user = decoded;
            next();
        });
        
    } catch (error) {
        console.error("JWT doğrulama hatası:", error); 
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Sunucu hatası, lütfen daha sonra tekrar deneyin."
        });
    }
}

module.exports = { jwtAuthentication };



















// const jwt = require("jsonwebtoken");
// const httpstatus = require("http-status-codes");
// const secret_key = "hilal_enelsis";

// function jwtAuthentication(req, res, next) {
//     try {
//         const jwttoken = req.headers.authorization;
//         if (!jwttoken) {
//             return res.status(httpstatus.StatusCodes.UNAUTHORIZED).json({
//                 message: "Oturum açılamadı. Token bulunamadı."
//             });
//         }

//         // Bearer kelimesini atla
//         const token = jwttoken.split(" ")[1];
//         if (!token) {
//             return res.status(httpstatus.StatusCodes.UNAUTHORIZED).json({
//                 message: "Oturum açılamadı. Token bulunamadı."
//             });
//         }
//         console.log("Token:", token);

//         jwt.verify(token, secret_key, (err, decoded) => {
//             if (err) {
//                 console.error("Token doğrulama hatası:", err); // Hata detaylarını loglayın
//                 return res.status(httpstatus.StatusCodes.UNAUTHORIZED).json({
//                     message: "Geçersiz token."
//                 });
//             }
//             req.user = decoded; // Kullanıcı bilgilerini req nesnesine ekle
//             next(); // Sonraki middleware'e geç
//         });
//     } catch (error) {
//         console.error("JWT doğrulama hatası:", error); // Hata mesajını console'a yazdır
//         return res.status(httpstatus.StatusCodes.UNAUTHORIZED).json({
//             message: "Token geçersiz."
//         });
//     }
// }

// module.exports = { jwtAuthentication };
