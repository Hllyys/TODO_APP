const { Prisma, PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const prisma = new PrismaClient();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/users', async (req, res) => {

    const data = req.body.data;

    try {
        const addedUser = await prisma.users.create({
            data: {
                name: data.name,
                surname: data.surname,
                nickname: data.nickname,
                mail: data.email,
                password: data.password
            }
        });
        res.status(200).send(addedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'eklenemedi' });
    }
});






app.post('/tasks', async (req, res) => {

    const data = req.data;

    try {
        const addedtask = await prisma.tasks.create({
            data: {
                user_id: data.user_id,
                explation: data.explation,
                category: data.category,
                date: new Date(data.date), // Tarih formatını kontrol edin
                status: data.status
            }
        });
        res.status(200).send(addedtask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'eklenemedi' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // ID'yi sayıya dönüştür
    const data = req.body.data; // req.body doğrudan al

    console.log(req.body); // Verileri kontrol et

    try {
        // Mevcut görevi kontrol et
        const existingTask = await prisma.tasks.findUnique({
            where: { id: id }
        });

        if (!existingTask) {
            return res.status(404).json({ error: 'Görev bulunamadı' }); // Görev bulunamazsa hata döndür
        }

        // Görevi güncelle
        const updatedTask = await prisma.tasks.update({
            where: { id: id },
            data: {
                user_id: data.user_id,
                id: data.id,
                explation: data.explation,
                category: data.category,
                date: new Date(data.date), // Tarih formatını kontrol edin
                status: data.status
            }
        });

        res.status(200).send(updatedTask);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'güncellenemedi' });
    }
});


app.delete('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const deletedTask = await prisma.tasks.delete({
            where: { id: id }
        });
        res.status(200).send(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
    }
});


app.get("/tasks/:user_id", async (req, res) => {
    try {
        let user_id = req.params.user_id;
        user_id = parseInt(user_id);
        const task = await prisma.tasks.findMany({
            where: { user_id: user_id }
        });
        res.status(200).send(task);
    } catch (error) {
        console.log("asdasd");
        console.log(error);
    }
});












// // POST /task endpoint'i ekleyin
// app.post('/task', (req, res) => {
//   const { title, content } = req.body;

//   // Burada task ekleme işlemini gerçekleştirebilirsiniz
//   res.json({ title, content });
// });







// app.post("/task",function(req,res){
// req.body.title;
// req.body.content;
// });


app.listen(3000, function (e) {
    console.log("Server 3000 portunda çalışıyor.");
});