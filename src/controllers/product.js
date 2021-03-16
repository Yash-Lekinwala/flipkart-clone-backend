import Product from '../models/product.js';
import shortid from 'shortid';
import slugify from 'slugify';

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