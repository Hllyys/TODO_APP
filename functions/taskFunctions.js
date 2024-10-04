const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());


async function addTask(user_id, explation, category_id, status) {
    try {
        const addedtask = await prisma.tasks.create({
            data: {
                users: {
                    connect: { id: user_id }
                },
                explation: explation,
                category: {
                    connect: { id: category_id }
                },
                status: status
            }

        });

        console.log("Task başarıyla kaydedildi. ", addedtask);
        return addedtask;

    } catch (error) {
        console.log("Hata Kodu: TF-1. " + error);
        throw error;
    }
}

async function updateTask(id, user_id, explation, category_id, status) {
    try {
        id = parseInt(id);
        if (!id) {
            throw "Eksik parametre: id.";
        }

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
                explation: explation,
                category: {
                    connect: { id: category_id }
                },
                status: status,
                users: {
                    connect: {
                        id: user_id
                    }
                }
            }
        });
        return updatedTask;
    } catch (error) {
        console.log("Hata Kodu: TF-2. " + error);
        throw error;
    }
}


async function deleteTask(id) {
    try {
        id = parseInt(id);
        const existingTask = await prisma.tasks.findUnique({
            where: { id }
        });

        const deletedTask = await prisma.tasks.delete({
            where: { id: id }
        });
        return deletedTask;
    } catch (error) {
        console.log("Hata Kodu: TF-3. " + error);
        throw error;
    }
}


async function getTask(id) {
    try {
        id = parseInt(id);
        const task = await prisma.tasks.findMany({
            where: { id: id },
            include: {
                category: true,
            }
        });

        if (task.length === 0) {
            return res.status(httpstatus.StatusCodes.BAD_REQUEST).json({ error: "Görev bulunamadı." + error });
        }
        return task;
    } catch (error) {
        console.log("Hata Kodu: TF-4. " + error);
        throw error;
    }
}


async function getTaskById(id) {
    try {
        id = parseInt(id);
        const task = await prisma.tasks.findUnique({
            where: { id: id },
            include: {
                category: true,
                users: true
            },
        });
        return task;

    } catch (error) {
        console.log("Hata Kodu: TF-4. " + error);
        throw error;
    }
}


async function getTaskByUserId(user_id) {
    try {
        user_id = parseInt(user_id);
        const task = await prisma.tasks.findMany({
            where: { user_id: user_id }
        });
        return task;

    } catch (error) {
        console.log("Hata Kodu: TF-4. " + error);
        throw error;
    }
}



async function getTasks({ limit, offset }) {
    try {
        limit = limit != undefined ? parseInt(limit) : undefined;
        offset = offset != undefined ? parseInt(offset) : undefined;
        const count = await prisma.tasks.count();
        const getTasks = await prisma.tasks.findMany({ take: limit, skip: offset });
        return {
            data: getTasks,
            count: count
        }
    } catch (error) {
        console.log("Hata Kodu: TF-5. " + error);
        throw error;
    }
}



async function checkTask(explation) {
    try {
        const task = await prisma.tasks.findFirst({
            where: { explation: explation }
        });
        return task != null;
    } catch (error) {
        console.log("Hata Kodu: TF-5. " + error);
        throw error;
    }
}


module.exports = { addTask, checkTask, deleteTask, getTask, getTasks, updateTask, getTaskByUserId,getTaskById };