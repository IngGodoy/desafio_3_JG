import express from "express";
import { ProductsManager} from "./manager/products.js";


const productsManager = new ProductsManager();  
const app = express();
const PORT = 8080;
app.use(express.json());
app.listen(PORT, ()=> console.log("server ok on port: " + PORT));

app.get("/api/products/", async (request, response)=>{

    const {limit} = request.query

    try{
        const products = await productsManager.getProducts();
        
        if(limit <= products.length && limit > 0 ){
            const newProducts =[];
            for (let i = 0; i < limit; i++) {
                newProducts.push(products[i]);
              };
            response.status(200).json(newProducts);
        }else{
            response.status(200).json(products);
        };    
    }catch (error){
        response.status(500).json(error.message);
    };
});

app.get("/api/products/:pid", async (request, response)=>{

    const {pid} = request.params;

    try{
        const productById = await productsManager.getProducById(parseInt(pid));
        
        if(productById === "Not found"){
            response.status(400).json(productById)
        }else{
            response.status(200).json(productById);
        }
   
    }catch (error){
        response.status(500).json(error.message);
    };
});

app.post("/api/products/", async (request, response)=>{
    try{
        const newProdct =  request.body;
        const checkCreation = await productsManager.addProduct(newProdct);
        console.log(checkCreation);
        if(checkCreation){
            response.status(200).json(newProdct); 
        }else {
            response.status(400).json({message:`invalid product error`});
        };
        
    }catch (error){
        response.status(500).json(error.message);
    };  
});

app.put("/api/products/:pid", async (request, response)=>{
    try{
        const {pid} = request.params;
        const updateProduct = request.body;
        const productCheckUpdate = await productsManager.updateProductById(parseInt(pid),updateProduct);
        productCheckUpdate ? response.status(200).json({... updateProduct,pid}) : response.status(400).json({message:`invalid product error`});
    }catch (error){
        response.status(500).json(error.message);
    };  
});

app.delete("/api/products/:pid", async (request, response)=>{
    try{
        const {pid} = request.params;
        const productCheckDelete = await productsManager.deletProduct(parseInt(pid));
        productCheckDelete ? response.status(200).json({message:`removed product`}) : response.status(400).json({message:`invalid product error`});
    }catch (error){
        response.status(500).json(error.message);
    };  
});


