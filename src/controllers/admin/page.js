import Page from "../../models/page.js";

export const createPage = async (req, res) => {
    const {banners, products} = req.files;
    if(banners && banners.length > 0)
    {
        req.body.banners = banners.map((banner, index) => ({
            img: `localhost:${process.env.PORT}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    if(products && products.length > 0)
    {
        req.body.products = products.map((product, index) => ({
            img: `localhost:${process.env.PORT}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id;

    try {
        const existingPage = await Page.findOne({category: req.body.category});
        if(existingPage)
        {
            const updatedPage = await Page.findOneAndUpdate({category: req.body.category}, req.body);
            res.status(201).json({page: updatedPage});
        }
        else
        {
            const page = await Page.create(req.body);
            res.status(201).json({page});
        }
        
    } catch (error) {
        res.status(400).json({error});
    }
}

export const getPage = async (req, res) => {
    const {category, type} = req.params;
    try {
        if(type == 'page')
        {
            const page = await Page.findOne({category:category});
            res.status(200).json({page});
        }
    } catch (error) {
        res.status(400).json({error});
    }
}