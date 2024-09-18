const { Prisma, PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const httpstatus = require("http-status-codes");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret_key = "hilal_enelsis";
const { authentication } = require('./middlewares/authentication');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//register
app.post('/users', async (req, res) => {
    try {
        const data = req.body.data;
        if (!data.name) {
            throw "İsim bilgisi girilmedi.";
        }
        if (!data.surname) {
            throw "Soyisim girilmedi.";
        }
        if (!data.nickname) {
            throw "Kullanıcı adı girilmedi.";
        }
        if (!data.mail) {
            throw "mail girilmedi.";
        }
        if (!data.password) {
            throw "Parola girilmedi.";
        }

        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const addedUser = await prisma.users.create({
            data: {
                name: data.name,
                surname: data.surname,
                nickname: data.nickname,
                mail: data.mail,
                created_date: new Date(),
                password: hashedPassword,
            }
        });
        res.status(httpstatus.StatusCodes.OK).send(addedUser);
    } catch (error) {
        console.error(error);
        res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: 'eklenemedi. ' + error });
    }
});

//login
app.post('/login', async (req, res) => {
    try {
        const data = req.body.data;
        if (!data.nickname) {
            throw "Kullanıcı adı girilmedi.";
        }
        if (!data.password) {
            throw "Parola girilmedi.";
        }

        const user = await prisma.users.findFirst({
            where: { nickname: data.nickname }
        });
        if (!user) {
            throw "Kullanıcı bulunamadı.";
        }
        const check = await bcrypt.compare(data.password, user.password);

        if (!check) {
            throw "Parola yanlış";
        }

        const jwt_key = jwt.sign({ id: user.id }, secret_key);

        // // JWT'yi doğrula
        // const checked = jwt.verify(jwtkey, secret_key); // Secret key ile doğrula
        // let id = req.params.id;

        res.status(httpstatus.StatusCodes.OK).json({
            message: "giris basarılı",
            key: jwt_key
        });
    } catch (error) {
        console.error(error);
        res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: 'eklenemedi. ' + error });
    }
});

app.use(authentication);

//task ekleme
app.post('/tasks', async (req, res) => {
    try {
        const data = req.body.data;
        if (!data.user_id) {
            throw "Kullanıcı id bilgisi girilmedi";

        }
        if (!data.explanation) {
            throw "Açıklama bilgisi girilmedi.";
        }
        if (!data.category) {
            throw "Katagori bilgisi girilmedi.";
        }
        if (!data.status) {
            throw "Durum bilgisi girilmedi.";
        }

        const userCOunt = await prisma.users.count({ where: { id: data.user_id } });
        if (userCOunt == 0) {
            throw "Kullanıcı bulunamadı.";
        }

        const addedtask = await prisma.tasks.create({
            data: {
                user_id: data.user_id,
                explation: data.explanation,
                category: data.category,
                date: new Date(),
                status: data.status
            }
        });
        res.status(httpstatus.StatusCodes.OK).send(addedtask);
    } catch (error) {
        console.error(error);
        res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: 'eklenemedi. ' + error });
    }
});

//task güncelleme
app.put('/tasks/:id', async (req, res) => {

    try {
        let id = req.params.id;
        id = parseInt(id);
        let data = req.body.data;
        if (!data.user_id) {
            throw "Kullanıcı bulunamadı.";
        }
        if (!id) {
            throw "Görev bulunamadı.";
        }
        if (!data.explation) {
            throw "Açıklama bulunamadı.";
        }
        if (!data.category) {
            throw "Katagori bulunamadı.";
        }
        if (!data.date) {
            throw "Tarih bulunamadı.";
        }
        if (!data.status) {
            throw "Durum bulunamadı.";
        }
        console.log(req.body.data);
        let existingTask = await prisma.tasks.findUnique({
            where: { id: id }
        });
        console.log('Existing Task:', existingTask);

        if (!existingTask) {
            res.status(httpstatus.StatusCodes.NOT_FOUND).json({ error: 'Görev bulunamadı.' });
        }
        let updatedTask = await prisma.tasks.update({
            where: { id: id },
            data: {
                user_id: data.user_id,
                explation: data.explation,
                category: data.category,
                date: new Date(data.date),
                status: data.status
            }
        });

        res.status(httpstatus.StatusCodes.OK).send(updatedTask);
    } catch (error) {
        console.error('Hata:', error);
        res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: 'Güncellenemedi. ' + error });
    }
});

//task silme
app.delete('/tasks/:id', async (req, res) => {

    try {
        // let jwtkey = req.headers.authorization;
        // // keyi doğrulama
        // if (!jwt.verify(secret_key, jwtkey)) {
        //     throw "oturum açılmadı.";
        // }

        const id = Number(req.params.id);
        const deletedTask = await prisma.tasks.delete({
            where: { id: id }
        });
        res.status(httpstatus.StatusCodes.OK).send(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: 'Error' });
    }
});

//task listeleme
app.get("/tasks/:user_id", async (req, res) => {
    try {
        // let jwtkey = req.headers.authorization;
        // // keyi doğrulama
        // if (!jwt.verify(secret_key, jwtkey)) {
        //     throw "oturum açılmadı.";
        // }

        let user_id = req.params.user_id;
        user_id = parseInt(user_id);
        const task = await prisma.tasks.findMany({
            where: { user_id: user_id }
        });

        if (task.length === 0) {
            return res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: "Görev bulunamadı." + error });
        }
        res.status(httpstatus.StatusCodes.OK).send(task);
    } catch (error) {
        res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: "error" + error });
    }
});


app.listen(3000, function (e) {
    console.log("Server 3000 portunda çalışıyor.");
});