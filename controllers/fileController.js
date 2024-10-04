const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fileManager = require("../managers/fileManager");

const multer = require("multer");
const path = require("path");
const fs = require("fs");


async function _addFile(req, res) {
    try {
        console.log('URL Parametreleri:', req.query);
        console.log('Gövdedeki Parametreler:', req.body);

        const taskid = parseInt(req.query.taskid);
        console.log("Task ID:", taskid);
        if (!taskid) {
            return res.status(400).json({
                message: "Task ID bilgisi eksik.",
                data: null
            });
        }

        const file = req.file;
        console.log("Yüklenen Dosya:", file);

        if (!file) {
            return res.status(400).json({
                message: "Dosya bulunamadı.",
                data: null
            });
        }


        console.log("Dosya Adı:", file.originalname);
        console.log("Dosya Yolu:", file.path);

        const addedFile = await fileManager.addFile(taskid, file.path, file.originalname);
        console.log("Yüklenen Dosya:", file);


        res.status(200).json({
            message: "File başarıyla eklendi.",
            data: addedFile
        });

    } catch (error) {
        console.log("Hata Kodu: FC-1. " + error);
        res.status(400).json({
            message: "File eklenemedi.",
            data: null
        });
    }
}

async function _deleteFile(req, res) {
    try {
        const id = parseInt(req.params.id);
        const deletedFile = await fileManager.deleteFile(id);
        res.status(200).json({
            message: "File silindi.",
            data: deletedFile
        });

    } catch (error) {
        console.log("Hata Kodu: FC-2. " + error);
        res.status(400).json({
            message: "File silinemedi.",
            data: null
        });
    }
}

async function _getFile(req, res) {
    try {
        const id = parseInt(req.params.id);
        const fileRecord = await fileManager.getFile(id);
        res.status(200).json({
            message: "File getirildi.",
            data: fileRecord
        });

    } catch (error) {
        console.log("Hata Kodu: FC-3. " + error);
        res.status(400).json({
            message: "File getirilemedi.",
            data: null
        });
    }
}

async function _updateFile(req, res) {
    try {
        const id = parseInt(req.params.id);
        const taskid = parseInt(req.query.taskid);
        const file = req.file;

        console.log("Gelen ID:", id);
        console.log("Gelen Task ID:", taskid);
        console.log("Yüklenen Dosya:", file);

        if (!taskid) {
            return res.status(400).json({
                message: "Task ID bilgisi eksik.",
                data: null
            });
        }

        if (!file) {
            return res.status(400).json({
                message: "Güncellenmesi gereken dosya bulunamadı.",
                data: null
            });
        }
        console.log("Dosya Adı:", file.originalname);
        console.log("Dosya Yolu:", file.path);

        const updatedFile = await fileManager.updateFile(id, taskid, file.path, file.originalname);
        res.status(200).json({
            message: "Güncelleme yapıldı.",
            data: updatedFile
        });

    } catch (error) {
        console.log("Hata Kodu: FC-4. " + error);
        res.status(400).json({
            message: "Güncelleme yapılamadı.",
            data: null
        });
    }
}

module.exports = { _addFile, _deleteFile, _getFile, _updateFile };
