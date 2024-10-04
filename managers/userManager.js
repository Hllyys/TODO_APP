const userFunction = require("../functions/userFunctions");
const bcrypt = require('bcrypt');
async function addRegister(name, surname, nickname, mail, password) {
    try {

        if (!name) {
            throw "İsim bilgisi girilmedi.";
        }
        if (!surname) {
            throw "Soyisim girilmedi.";
        }
        if (!nickname) {
            throw "Kullanıcı adı girilmedi.";
        }
        if (!mail) {
            throw "mail girilmedi.";
        }
        if (!password) {
            throw ""
        }
        const checkUser=await userFunction.checkUser(mail);
        if (checkUser) {
            throw "Bu kişi zaten mevcut. "
        }

        const addedUser = await userFunction.addRegister(name, surname, nickname, mail, password);
        return addedUser;
    } catch (error) {
        console.log("Hata Kodu: UM-1. " + error);
        throw error;
    }
}

async function getLogin(nickname, password) {
    try {
        if (!nickname) {
            throw "Kullanıcı adı girilmedi.";
        }
        if (!password) {
            throw "parola girilmedi. "
        }

        const getuser = await userFunction.addLogin(nickname,password);
        if (!getuser) {
            throw "Kullanıcı bulunamadı.";
        }
        const isPasswordValid = await bcrypt.compare(password, getuser.password);
        if (!isPasswordValid) {
            throw "Geçersiz şifre.";
        }
        return getuser;
    } catch (error) {
        console.log("Hata Kodu: UM-2 " + error);
        throw error;
    }
}

async function getUser(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const getuser = await userFunction.getUser(id);
        return getuser;
    } catch (error) {
        console.log("Hata Kodu: UM-3 " + error);
        throw error;
    }
}


async function deleteUser(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const deletedUser = await userFunction.deleteUser(id);
        return deletedUser;
    } catch (error) {
        console.log("Hata Kodu: UM-4 " + error);
        throw error;
    }
}


async function updateUser(id, name, surname, nickname, mail, password) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        if (!name) {
            throw "Eksik parametre.";
        }
        if (!mail) {
            throw "Eksik parametre.";
        }
        if (!password) {
            throw "Eksik parametre.";
        }
        if (!surname) {
            throw "Eksik parametre.";
        }
        if (!nickname) {
            throw "Eksik parametre.";
        }
        const check = await userFunction.checkUser(mail);
        if (check) {
            throw "Kullanıcı mevcut.";
        }
        const updatedUser = await userFunction.updateUser(id, name, surname, nickname, mail, password);
        return updatedUser;
    } catch (error) {
        console.log("Hata Kodu: UM-5 " + error);
        throw error;
    }
}


module.exports = { addRegister, deleteUser, getUser, updateUser, getLogin };