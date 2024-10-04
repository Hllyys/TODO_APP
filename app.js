const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { corsMiddleware } = require("./middlewares/corsMiddleware");
const { jwtAuthentication } = require("./middlewares/authentication");
const userController = require('./controllers/userController');
const multer = require("./middlewares/multer");
const categoryController = require("./controllers/categoryController");
// Routerlar
const usersRouter = require('./routers/userRouter');
const tasksRouter = require('./routers/taskRouter');
const fileRouter = require("./routers/fileRouter");
const categoryRouter = require("./routers/categoryRouter");
const app = express();

// Yeni bir router oluştur
const router = express.Router();

// Logger, bodyParser gibi middleware'leri ekleyin
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
};

// Login route
app.post("/login", userController._addlogin);
app.post("/register", userController._addUser);

// CORS middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// JSON gövdesini çözümlemek için middleware
app.use(bodyParser.json());
// URL-encoded gövdesini çözümlemek için middleware
app.use(bodyParser.urlencoded({ extended: true }));
// JWT authentication middleware
app.use(jwtAuthentication);

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use("/files", fileRouter);
app.use("/category", categoryRouter);

// Örnek bir route
app.get('/test', (req, res) => {
    res.json({ message: "CORS ve Authentication çalışıyor!" });
});

// Hata yakalayıcı middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Bir hata oluştu!');
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

module.exports = app;