import Category from '../models/category.js';
import slugify from "slugify";
import shortid from 'shortid';

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
            parentId: cat.parentId,
            type: cat.type,
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

export const updateCategories = async (req, res) => {
    const {_id, name, parentId, type} = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
        for(let i=0; i< name.length; i++)
        {
            const category = {
                name: name[i],
                type: type[i]
            };

            if(parentId[i] !== '')
            {
                category.parentId = parentId[i];
            }

            try {
                const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true});
                updatedCategories.push(updatedCategory);
            } catch (error) {
                console.log(error);
            }
        }
        res.status(201).json({updatedCategories});
    } else {
        const category = {
            name: name,
            type: type
        };

        if(parentId !== '')
        {
            category.parentId = parentId;
        }

        try {
            const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true});
            res.status(201).json({updatedCategory});
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteCategories = async(req, res) => {
    const ids = req.body;
    const deletedCategories = [];
    for(let i=0; i<ids.length; i++)
    {
        try {
            const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id});
            deletedCategories.push(deleteCategory);
        } catch (error) {
            console.log(error);
        }
    }
    if(deletedCategories.length == ids.length)
        res.status(200).json({message: 'Categories Removed'});
}   