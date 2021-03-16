import Category from '../models/category.js';
import slugify from "slugify";

export const addCategory = async (req, res) => {
    const {name, parentId} = req.body;
    let categoryImage;

    if(req.file)
    {
        categoryImage = req.file.filename;
    }
    
    const categoryObj = {
        name, slug: slugify(name).toLowerCase(), categoryImage
    }

    if(parentId)
        categoryObj.parentId = parentId;

    try {
        const category = await Category.create(categoryObj);
        res.status(201).json({category});
    } catch (error) {
        res.status(400).json({error});
    }
}

function createCategories(categories, parentId = null)
{
    const categoryList = [];
    let category;
    if(parentId == null)
    {
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cat of category)
    {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategories(categories, cat._id)
        });
    }
    return categoryList;
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const categoryList = createCategories(categories);
        res.status(201).json({categoryList});
    } catch (error) {
        res.status(400).json({error});
    }
}