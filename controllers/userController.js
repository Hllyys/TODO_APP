const userManager = require("../managers/userManager");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken');
const secret_key = "hilal_enelsiss";
const httpstatus = require('http-status');
const { getUser } = require("../functions/userFunctions");
const { token } = require("morgan");

async function _addUser(req, res) {
    try {
        const data = req.body.data;

        const addUser = await userManager.addRegister(data.name, data.surname, data.nickname, data.mail, data.password);
        res.json({
            message: "Kullanıcı oluşturuldu. ",
            datalist: addUser
        });

    } catch (error) {
        console.log("Hata Kodu: UC-1. " + error);
        res.json({
            message: "Kullanıcı Oluşturulamadı .",
            datalist: null
        });
    }
}


async function _addlogin(req, res) {
    try {
        const data = req.body.data;
        const nickname = data.nickname; 
        const password = data.password; 

        console.log("nickname:", nickname);
        console.log("password:", password);

        const getlogin = await userManager.getLogin(nickname, password);

        // Kullanıcı geçerli ise token oluştur
        const token = jwt.sign({ nickname }, secret_key);
        console.log("Oluşturulan Token:", token);
        return res.status(200).json({
            message: "Giriş başarılı",
            token: token,
            data: {
                id: getlogin.id,
                name: getlogin.name,
                surname: getlogin.surname,
                nickname: getlogin.nickname,
                mail: getlogin.mail
            }
        });
    } catch (error) {
        console.log("Hata Kodu: UC-2. " + error);
        return res.status(500).json({ message: "Bir hata oluştu.", datalist: null });
    }
}

async function _getUser(req, res) {
    try {
        const id = req.params.id;
        console.log("Alınan ID:", id);
        const user = await userManager.getUser(id);
        res.json({
            message: "Kullanıcılar getirilidi. ",
            datalist: user
        });
    } catch (error) {
        console.log("Hata Kodu: UC-3. " + error);
        res.json({
            message: "Kullanıcı getirelemedi .",
            datalist: null
        });
    }
}

async function _updateUser(req, res) {
    try {
        const data = req.body.data;
        const id = req.params.id;
        const updateUser = await userManager.updateUser(id, data.name, data.surname, data.nickname, data.mail, data.password);
        res.json({
            message: "Kullanıcı güncellendi. ",
            datalist: updateUser
        });

    } catch (error) {
        console.log("Hata Kodu: UC-4. " + error);
        res.json({
            message: "Kullanıcı güncellenemedi .",
            datalist: null
        });
    }
}


async function _deleteUser(req, res) {
    try {
        const id = req.params.id;
        const deleteUser = await userManager.deleteUser(id);
        res.json({
            message: "Kullanıcı silindi. ",
            datalist: deleteUser
        });
    } catch (error) {
        console.log("Hata Kodu: UC-5. " + error);
        res.json({
            message: "Kullanıcı silinemedi .",
            datalist: null
        });
    }
}

module.exports = { _addUser, _deleteUser, _getUser, _updateUser, _addlogin };