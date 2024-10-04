const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { authentication } = require("../middlewares/authentication");
const jwt = require("jsonwebtoken");
const secret_key = "hilal_enelsis";
const express = require("express");



async function addRegister(name, surname, nickname, mail, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const addedUser = await prisma.users.create({
            data: {
                name,
                surname,
                nickname,
                mail,
                password: hashedPassword,
            }
        });

        console.log("Kullanıcı başarıyla kaydedildi:", addedUser);
        return addedUser;
    } catch (error) {
        console.log("Hata Kodu: UF-1. " + error);
        throw error;
    }
}


async function addLogin(nickname) {
    try {
        const user = await prisma.users.findFirst({
            where: { nickname: nickname }
        });
        if (!user) {
            throw "Kullanıcı bulunamadı.";
        }
        return user;
    } catch (error) {
        console.log("Hata Kodu: UF-2. " + error);
        throw error;
    }
}


async function deleteUser(id) {
    try {
        id = parseInt(id);
        const deletedUser = await prisma.users.delete({ where: { id: id } });
        return deletedUser;
    } catch (error) {
        console.log("Hata Kodu: UF-3. " + error);
        throw error;
    }
}


async function updateUser(id, name, surname, nickname, mail, password) {
    try {
        id = parseInt(id);
        const userExists = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        if (!userExists) {
            throw new Error("Güncellenecek kullanıcı bulunamadı.");
        }
        const updatedUser = await prisma.users.update({
            where: { id: id },
            data: {
                name,
                surname,
                nickname,
                mail,
                password
            }

        });
        return updatedUser;

    } catch (error) {
        console.log("Hata Kodu: UF-4. " + error);
        throw error;
    }
}



async function getUser(id) {
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            throw "Geçersiz ID.";
        }
        const getuser = await prisma.users.findUnique({
            where: { id: id }
        });
        return getuser;
    } catch (error) {
        console.log("Hata Kodu: UF-5. " + error);
        throw error;
    }
}


async function checkUser(mail) {
    try {
        const user = await prisma.users.findFirst({
            where: { mail: mail }
        });
        return user != null;
    } catch (error) {
        console.log("Hata Kodu: UF-6. " + error);
        throw error;
    }
}

module.exports = { addLogin, addRegister, checkUser, deleteUser, updateUser, getUser };