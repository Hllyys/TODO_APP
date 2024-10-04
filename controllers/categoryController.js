const categoryManager = require("../managers/categoryManager");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



async function _addCategory(req, res) {
    try {
        const data = req.body.data;
        const addedCategory = await categoryManager.addCategory(data.category_name);
        res.json({
            message: "Kategori oluşturuldu. ",
            datalist: addedCategory
        });

    } catch (error) {
        console.log("Hata Kodu: CC-1. " + error);
        res.json({
            message: "Kategori Oluşturulamadı .",
            datalist: null
        });
    }

}

async function _deleteCategory(req, res) {
    try {
        const id = req.params.id;
        const deletedCategory = await categoryManager.deleteCategory(id);
        res.json({
            message: "Kategori silindi. ",
            datalist: deletedCategory
        });
    } catch (error) {
        console.log("Hata Kodu: CC-2. " + error);
        res.json({
            message: "Kategori silinemedi .",
            datalist: null
        });
    }

}


async function _getCategory(req, res) {
    try {
        const id = req.params.id;
        console.log("Alınan ID:", id);
        const getcategory = await categoryManager.getCategory(id);
        res.json({
            message: "Kategoriler getirildi. ",
            datalist: getcategory
        });
    } catch (error) {
        console.log("Hata Kodu: CC-3. " + error);
        res.json({
            message: "Kategori getirilemedi .",
            datalist: null
        });
    }

}


async function _getcategories(req, res) {
    try {
        const { limit, offset } = req.query;
        const getcategory = await categoryManager.getCategories(limit, offset);
        res.json({
            message: "Kategori  getirildi. ",
            datalist: getcategory
        });

    } catch (error) {
        console.log("Hata Kodu: CC-4. " + error);
        res.json({
            message: "Kategori getirilemedi .",
            datalist: null
        });
    }
}



async function _updateCategory(req, res) {
    try {
        const data = req.body.data;
        const id = req.params.id;
        const updatedCategory = await categoryManager.updateCategory(id, data.category_name);
        res.json({
            message: "Kategori güncellendi. ",
            datalist: updatedCategory
        });
    } catch (error) {
        console.log("Hata Kodu: CC-5. " + error);
        res.json({
            message: "Kategori güncellenemedi .",
            datalist: null
        });
    }

}

module.exports = { _addCategory, _deleteCategory, _getCategory, _updateCategory,_getcategories };