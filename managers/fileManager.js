const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fileFunction = require("../functions/fileFunction");
const path = require('path');


async function addFile(taskid, filepath, filename) {
    try {
        if (!taskid) {
            throw "Task id bilgisi girilmedi.";
        }
        if (!filepath) {
            throw "filepath bilgisi girilmedi.";
        }
        if (!filename) {
            throw "filename bilgisi girilmedi.";
        }

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'text/plain']; // İzin verilen MIME türleri
        const mimeTypes = {
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.txt': 'text/plain', 
        };

        const fileExtension = path.extname(filename).toLowerCase(); // Dosya uzantısını al
        const fileMimeType = mimeTypes[fileExtension]; // MIME türünü al

        console.log("Dosya Uzantısı:", fileExtension);
        console.log("Dosya MIME Türü:", fileMimeType);

        if (!allowedMimeTypes.includes(fileMimeType)) {
            throw "Bu dosya türü kabul edilmiyor. Sadece JPEG ve PNG dosyaları yüklenebilir.";
        }

        const addedfile = await fileFunction.addFile(taskid, filepath, filename);
        return addedfile;
    } catch (error) {
        console.log("Hata Kodu: FM-1. " + error);
        throw error;
    }
}

async function getFile(id) {
    try {
        if (!id) {
            throw "ID eksik parametre.";
        }
        const getfile = await fileFunction.getFile(id);
        return getfile;
    } catch (error) {
        console.log("Hata Kodu: FM-2 " + error);
        throw error;
    }
}

async function deleteFile(id) {
    try {
        if (!id) {
            throw "ID eksik parametre.";
        }
        const count = await prisma.files.count({ where: { id: id } });
        if (!count) {
            throw "Dosya bulunamadı. "
        }
        const deletedfile = await fileFunction.deleteFile(id);
        return deletedfile;
    } catch (error) {
        console.log("Hata Kodu: FM-3 " + error);
        throw error;
    }
}

async function updateFile(id, taskid, filepath, filename) {
    try {
        if (!taskid) {
            throw "Task id bilgisi girilmedi";
        }
        if (!filepath) {
            throw "filepath  bilgisi girilmedi";
        }
        if (!filename) {
            throw "filename  bilgisi girilmedi";
        }
        const count = await prisma.files.count({ where: { id: parseInt(id) } });
        if (count == 0) {
            throw "Dosya bulunamadı.";
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'text/plain']; // İzin verilen MIME türleri
        const mimeTypes = {
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.txt': 'text/plain', 
        };


        const fileExtension = path.extname(filename).toLowerCase(); // Dosya uzantısını al
        const fileMimeType = mimeTypes[fileExtension]; // MIME türünü al

        console.log("Dosya Uzantısı:", fileExtension);
        console.log("Dosya MIME Türü:", fileMimeType);

        if (!allowedMimeTypes.includes(fileMimeType)) {
            throw "Bu dosya türü kabul edilmiyor. Sadece JPEG ve PNG dosyaları yüklenebilir.";
        }


        const updatedfile = await fileFunction.updateFile(id, taskid, filepath, filename);
        return updatedfile;
    } catch (error) {
        console.log("Hata Kodu: FM-4. " + error);
        throw error;
    }
}

module.exports = { addFile, updateFile, deleteFile, getFile };