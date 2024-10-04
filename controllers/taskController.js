const taskManager=require("../managers/taskManager");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function _addTask(req, res) {
    try {
        const data = req.body.data || {};
        console.log("Gelen veri:", data);
        console.log("Status:", data.status); 
        console.log("User ID:", data.user_id); 

        // Burada gelen verilerin hepsini kontrol edin
        console.log("controller:", {
            user_id: data.user_id,
            explation: data.explation,
            category: data.category,
            status: data.status
        });


        const addedtask = await taskManager.addTask(data.user_id, data.explation, data.category, data.status);
        
        res.json({
            message: "Task eklendi. ",
            datalist: addedtask
        });
    } catch (error) {
        console.log("Hata Kodu: TC-1. " + error);
        res.json({
            message: "Task Oluşturulamadı .",
            datalist: null
        });
    }
}

async function _gettask(req,res) {
    try {
        const id = req.params.id;
        console.log("Alınan ID:", id);
        const user = await taskManager.getTask(id);
        res.json({
            message: "task getirilidi. ",
            datalist: user
        });
    } catch (error) {
        console.log("Hata Kodu: TC-3. " + error);
        res.json({
            message: "Task getirelemedi .",
            datalist: null
        });
    }
}

async function _getTasks(req, res) {
    try {
        const { limit, offset } = req.query;
        const getTasks = await taskManager.getTasks(limit, offset);
        res.json({
            message: "Task getirilidi. ",
            datalist: getTasks
        });

    } catch (error) {
        console.log("Hata Kodu: TC-2. " + error);
        res.json({
            message: "Task getirilemedi .",
            datalist: null
        });
    }
}



async function _updateTask(req, res) {
    try {
        const data = req.body.data;
        const id = req.params.id;
        
        const updatedTask = await taskManager.updateTask(id, data.user_id, data.explation, data.category, data.status);
        res.json({
            message: "Task güncellendi. ",
            datalist: updatedTask
        });

    } catch (error) {
        console.log("Hata Kodu: TC-3. " + error);
        res.json({
            message: "Task güncellenemedi .",
            datalist: null
        });
    }
}



async function _deleteTask(req, res) {
    try {
        const id = req.params.id;
        const deleteTask = await taskManager.deleteTask(id);
        res.json({
            message: "Task silindi. ",
            datalist: deleteTask
        });

    } catch (error) {
        console.log("Hata Kodu: TC-3. " + error);
        res.json({
            message: "Task silinemedi .",
            datalist: null
        });
    }
}

module.exports = { _addTask, _deleteTask, _getTasks, _updateTask ,_gettask};