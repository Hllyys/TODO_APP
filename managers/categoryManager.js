const categoryFunction = require("../functions/categoryFunctions");

async function addCategory(category_name) {
    try {
        if (!category_name) {
            throw "Kategori ismi girilmedi. ";
        }
        const addedCategory = await categoryFunction.addCategory(category_name);
        return addedCategory;
    } catch (error) {
        console.log("Hata Kodu: CM-1. " + error);
        throw error;
    }
}

async function getCategory(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const getcategory = await categoryFunction.getCategory(id);
        return getcategory;
    } catch (error) {

    } console.log("Hata Kodu: UM-2. " + error);
    throw error;
}

async function getCategories(limit, offset) {
    try {
        const getcategory = await categoryFunction.getCategories({ limit, offset });
        return getcategory;

    } catch (error) {
        console.log("Hata Kodu: UM-3. " + error);
        throw error;
    }
}

async function deleteCategory(id) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        const deletedcategory = await categoryFunction.deleteCategory(id);
        return deletedcategory;
    } catch (error) {
        console.log("Hata Kodu: UM-4. " + error);
        throw error;
    }
}

async function updateCategory(id, category_name) {
    try {
        if (!id) {
            throw "Eksik parametre.";
        }
        if (!category_name) {
            throw "Eksik parametre.";
        }
      
        const updatedCategory = await categoryFunction.updateCategory(id, category_name);
        return updatedCategory;

    } catch (error) {
        console.log("Hata Kodu: UM-5. " + error);
        throw error;
    }
}

module.exports = { addCategory, deleteCategory, getCategory, updateCategory ,getCategories};