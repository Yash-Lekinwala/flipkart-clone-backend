import Cart from '../models/cart.js';

export const addItemsToCart = async (req, res) => {
    const {cartItems} = req.body;
    try {
        const existingCart = await Cart.findOne({user: req.user._id});
        if(existingCart)
        {
            const existingProduct = existingCart.cartItems.find(c => c.product == cartItems.product);
            let condition, update;
            if(existingProduct)
            {
                condition = { "user": req.user._id, "cartItems.product": cartItems.product };
                update = {
                            "$set": {
                                "cartItems.$": {...cartItems, quantity: existingProduct.quantity + cartItems.quantity}
                            }
                        };                
            }
            else
            {
                condition = { user: req.user._id };
                update = {
                            "$push": {
                                "cartItems": cartItems
                            }
                        };
            }
            const cart = await Cart.findOneAndUpdate(condition, update);
            res.status(201).json({cart});
        }
        else
        {
            const cart = await Cart.create({
                user: req.user._id, cartItems: [cartItems]
            });
            res.status(201).json({cart});
        }        
    } catch (error) {
        console.log(error);
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