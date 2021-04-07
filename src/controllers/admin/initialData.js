import Category from "../../models/category.js";
import Product from "../../models/product.js";

export const initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({}).exec();

    res.status(200).json({
        categories,
        products
    })
}