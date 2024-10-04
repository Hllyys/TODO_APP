const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


async function addFile(taskid, filepath, filename) {
    try {

        const newFile = await prisma.files.create({
            data: {
                filepath: filepath,
                filename: filename,
                tasks: { 
                    connect: { id: taskid } 
                }
            }
        });

        return newFile;
    } catch (error) {
        console.log("Hata Kodu: FF-1. " + error);
        throw error;
    }
}


async function deleteFile(id) {
    try {
        id = parseInt(id);
        const fileRecord = await prisma.files.findUnique({
            where: { id }
        });

        if (!fileRecord) {
            throw new Error("Dosya kaydı bulunamadı.");
        }

        fs.unlinkSync(fileRecord.filepath); // Dosya fiziksel olarak siliniyor

        const deletedFile = await prisma.files.delete({
            where: { id: id },
        });
        return deletedFile;
    } catch (error) {
        console.log("Hata Kodu: FF-2. " + error);
        throw error;
    }
}

async function getFile(id) {
    try {
        id = parseInt(id);
        const fileRecord = await prisma.files.findUnique({
            where: { id: id },
            include: {
                tasks: true,
            }
        });

        if (!fileRecord) {
            throw "Dosya bulunamadı.";
        }

        return fs.createReadStream(fileRecord.filepath); // Dosyayı istemciye gönder
    } catch (error) {
        console.log("Hata Kodu: FF-3. " + error);
        throw error;
    }
}

async function updateFile(id, taskid, filepath, filename) {
    try {
        if (!id) {
            throw "Dosya ID'si girilmedi.";
        }

        const file = await prisma.files.findUnique({
            where: { id: parseInt(id) },
        });
        if (!file) {
            throw "Dosya bulunamadı.";
        }


        fs.unlinkSync(file.filepath);// Eski dosya fiziksel olarak siliniyor

        const updatedFile = await prisma.files.update({
            where: { id: parseInt(id) },
            data: {
                tasks: { 
                    connect: { id: taskid }
                },
                filepath,
                filename
            },
        });
        return updatedFile;
    } catch (error) {
        console.log("Hata Kodu: FF-4. " + error);
        throw error;
    }
}

module.exports = { addFile, deleteFile, getFile, updateFile };
