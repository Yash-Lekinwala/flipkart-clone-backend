import Product from '../models/product.js';
import shortid from 'shortid';
import slugify from 'slugify';
import Category from "../models/category.js";

export const addProduct = async (req, res) => {
    // res.status(200).json({file: req.files, body: req.body });
    const {name, price, description, category, quantity, createdBy } = req.body;
    let productPictures = [];
    try {
        if(req.files.length > 0)
        {
            productPictures = req.files.map(file => {
                return {img: file.filename}
            });
        }
        const product = await Product.create({
            name, slug: slugify(name).toLowerCase(),
            price, description, productPictures, category, quantity,
            createdBy: req.user._id
        });
        res.status(201).json({product});
    } catch (error) {
        res.status(400).json({error});
    }
}

export const getProductsBySlug = async (req, res) => {
    const {slug} = req.params;
    try {
        const category = await Category.findOne({slug:slug}).select('_id');
        if(category)
        {
            const products = await Product.find({category: category._id});
            if(products.length > 0)
            {
                res.status(200).json({
                    products,
                    productsByPrice: {
                        under5k: products.filter(product => product.price <= 5000),
                        under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                        under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                        under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                        under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                    }
                });
            }
        }
        else
        {
            res.status(400).json({error: 'No Category Found.'});
        }
    } catch (error) {
        res.status(400).json({error});
    }

}