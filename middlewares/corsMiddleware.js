const cors = require("cors");

// CORS middleware
function corsMiddleware(req, res, next) {
    const corsOptions = {
        origin: "http://localhost:3000",  // Belirli bir kaynağa izin ver
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true  // Çerezler ve kimlik bilgilerine izin ver
    };
    cors(corsOptions)(req, res, next);  // CORS ayarlarını uygula
}

module.exports = { corsMiddleware };
