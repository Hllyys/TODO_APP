const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const express = require("express");

async function addCategory(category_name) {
    try {
        const addedCategory = await prisma.category.create({
            data: {
                category_name
            }
        });
        console.log("Category Kaydedildi. ", addedCategory);
        return addedCategory;
    } catch (error) {
        console.log("Hata Kodu: CF-1. " + error);
        throw error;
    }
}

async function deleteCategory(id) {
    try {
        id = parseInt(id);
        const deletedCategory = await prisma.category.delete({
            where: { id: id }
        });
        return deletedCategory;
    } catch (error) {
        console.log("Hata Kodu: CF-2. " + error);
        throw error;
    }
}


async function getCategory(id) {
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            throw "Geçersiz ID.";
        }
        const getcategory = await prisma.category.findUnique({ where: { id: id } });
        return getcategory;
    } catch (error) {
        console.log("Hata Kodu: CF-3. " + error);
        throw error;
    }
}

async function getCategories({ limit, offset }) {
    try {
        limit = limit != undefined ? parseInt(limit) : undefined;
        offset = offset != undefined ? parseInt(offset) : undefined;
       
        const getcategory = await prisma.category.findMany({ take: limit, skip: offset });
        return {
            data:getcategory
        };
    } catch (error) {
        console.log("Hata Kodu: CF-4. " + error);
        throw error;
    }
}



async function updateCategory(id, category_name) {
    try {
        id = parseInt(id);
        const userExists = await prisma.category.findUnique({
            where: {
                id: id
            }
        });
        if (!userExists) {
            throw new Error("Güncellenecek category bulunamadı.");
        }
        const updatedCategory = await prisma.category.update({
            where: { id: id },
            data: {
                category_name
            }
        });
        return updatedCategory;
    } catch (error) {
        console.log("Hata Kodu: CF-5. " + error);
        throw error;
    }
}

module.exports = { addCategory, deleteCategory, getCategory, updateCategory,getCategories };