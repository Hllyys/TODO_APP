const taskFunction = require("../functions/taskFunctions");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function addTask(user_id, explation, category_id, status) {
    try {
        console.log("manager", { user_id, explation, category_id, status });

        if (!user_id) {
            throw "Kullanıcı id bilgisi girilmedi";
        }
        if (!explation) {
            throw "Açıklama bilgisi girilmedi.";
        }
        if (!category_id) {
            throw "Katagori bilgisi girilmedi.";
        }
        if (status === undefined || status === null || status.trim() === "") {
            throw "Durum bilgisi girilmedi.";
        }
        const check = await taskFunction.checkTask(explation);
        if (check) {
            throw "Bu task zaten mevcut. "
        }

        const userCOunt = await prisma.users.count({ where: { id: user_id } });
        if (userCOunt == 0) {
            throw "Kullanıcı bulunamadı.";
        }
        const addedtask = await taskFunction.addTask(user_id, explation, category_id, status);
        return addedtask;
    } catch (error) {
        console.log("Hata Kodu: TM-1. " + error);
        throw error;
    }
}


async function getTask(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const getTask = await taskFunction.getTask(id);
        return getTask;
    } catch (error) {
        console.log("Hata Kodu: TM-2 " + error);
        throw error;
    }
}

async function getTaskById(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const getTask = await taskFunction.getTaskByUserId(id);
        return getTask;
    } catch (error) {
        console.log("Hata Kodu: TM-3 " + error);
        throw error;
    }
}

async function getTaskByUserId(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const getTask = await taskFunction.getTaskById(id);
        return getTask;
    } catch (error) {
        console.log("Hata Kodu: TM-3 " + error);
        throw error;
    }
}


async function getTasks(limit, offset) {
    try {
        const getTasks = await taskFunction.getTasks({ limit, offset });
        return getTasks;

    } catch (error) {
        console.log("Hata Kodu: TM-4. " + error);
        throw error;
    }
}



async function deleteTask(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const count = await prisma.tasks.count({ where: { id: id } });
        if (!count) {
            throw "Task bulunamadı. "
        }
        const deletedTask = await taskFunction.deleteTask(id);
        return deletedTask;
    } catch (error) {
        console.log("Hata Kodu: TM-5 " + error);
        throw error;
    }
}


async function updateTask(id, user_id, explation, category_id, status) {
    try {

        if (!user_id) {
            throw "Eksik parametre.";
        }
        if (!explation) {
            throw "Eksik parametre.";
        }
        if (!category_id) {
            throw "Eksik parametre.";
        }
        if (!status) {
            throw "Eksik parametre.";
        }
        const count = await prisma.tasks.count({ where: { id: parseInt(id) } });
        if (!count) {
            throw "Task bulunamadı. "
        }

        const updatedTask = await taskFunction.updateTask(id, user_id, explation, category_id, status);
        return updatedTask;
    } catch (error) {
        console.log("Hata Kodu: TM-6 " + error);
        throw error;
    }
}

module.exports = { addTask, deleteTask, getTask, getTasks, updateTask, getTaskByUserId,getTaskById };