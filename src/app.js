import express from "express";
import { ProductsManager} from "./manager/products.js";


const productsManager = new ProductsManager();  
const app = express();
const PORT = 8080;
app.use(express.json());
app.listen(PORT, ()=> console.log("server ok on port: " + PORT));

app.get("/products", async (request, response)=>{

    const {limit} = request.query

    try{
        const products = await productsManager.getProducts();
        
        if(limit <= products.length && limit > 0 ){
            const newProducts =[];
            for (let i = 0; i < limit; i++) {
                newProducts.push(products[i]);
              };
            console.log("lectura 1: ") // borrar
            console.log(newProducts) // borrar
            response.status(200).json(newProducts);
        }else{
            response.status(200).json(products);
            console.log("lectura 2: ") // borrar
            console.log(products) // borrar
        };    
    }catch (error){
        response.status(500).json(error.message);
    };
});

app.get("/products/:pid", async (request, response)=>{

    const {pid} = request.params;

    try{
        const productById = await productsManager.getProducById(parseInt(pid));
        response.status(200).json(productById);
   
    }catch (error){
        response.status(500).json(error.message);
    };
});


