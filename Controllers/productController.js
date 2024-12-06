
const {products} = require("../store")



const getAllproducts = (req, res) => {
    const { manufacturer, year, carName } = req.query;

    let filteredProducts = products;

    if (manufacturer) {
        filteredProducts = filteredProducts.filter(product => product.manufacturer === manufacturer);
    }

    if (year) {
        filteredProducts = filteredProducts.filter(product => product.year === parseInt(year, 10));
    }

    if (carName) {
        filteredProducts = filteredProducts.filter(product => product.carName === carName);
    }

    res.status(200).json({ data: filteredProducts });
};

const getParticularproduct=(req,res,next)=>{
    console.log(req.params);
    
    const prodId=parseInt(req.params.id)
    let product=null
    for(let i=0; i<products.length; i++){
        if (products[i].id===prodId){
         product=products[i]
         break;
        }
            
    }
    res.status(200).json({data:product})
}
const addProduct=(req,res,next)=>{
    const newProduct={
        id:products.length+1,
       image:req.body.image,
       car_name:req.body.car_name,
       year:req.body.year,
       manufacturer:req.body.manufacturer,
       vin:req.body.vin
    };
    products.push(newProduct);
    res.status(201).json({message:'new Product added successfully',data:newProduct});
}
const updateProduct=(req,res)=>{
    const productId = parseInt(req.params.id);
    const { image,car_name,year,manufacturer,vin } = req.body;

    
    const productFound = products.find(p => p.id === productId);

    if (!productFound) {
        return res.status(404).json({ message: 'product not found' });
    }

    
    console.log('Before update:', products);

   
    Object.assign(productFound, {  image,car_name,year,manufacturer,vin });

    
    console.log('After update:', productFound);

    
    res.status(200).json({ message: 'product updated successfully', data: productFound });
};



module.exports=({getAllproducts,getParticularproduct,addProduct,updateProduct})