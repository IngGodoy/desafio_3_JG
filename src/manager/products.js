import fs from "fs";

export class ProductsManager{
    constructor (){
        this.path = "./src/data/products.json"
    };

    async addProduct(productAdd){
        try{
            const products = await this.getProducts();
            const newProduct= { 
                id: this.#newIdProduct(products),
                title: productAdd.title,
                description: productAdd.description,
                price: productAdd.price,
                thumbnail : productAdd.thumbnail,
                code : productAdd.code,
                stock: productAdd.stock,
                category : productAdd.category,
                status: productAdd.status ? productAdd.status : true 
             };
            
             let checkProductByCode = products.find((product) => newProduct.code === product.code);
             if (!checkProductByCode && this.#checkNewProdut(newProduct)) {
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log(`El producto ${newProduct.title} ha sido agregado.`);
                return true;
             } else {
                console.log(`invalid product error`);
                return false;
             };
        }catch (error) {
            console.log(error);
        };
    };
   
    #checkNewProdut(newProduct) {
        for (let key in newProduct) {
            if (key === 'status' || key === 'thumbnail') {
                continue; // Saltar la verificación de la llave 'status'y 'thumbnail'
            }
            console.log(key + ' --- ' + newProduct[key]); // Borrar
            if (typeof newProduct[key] === 'undefined' || newProduct[key] === null || newProduct[key] === '') {
                return false;
            };
        };
        return true;
    };
    
    

    #newIdProduct(products){
            let idMax = 0;
             products.map((product)=>{
                if(parseInt(product.id) > idMax){
                    idMax = parseInt(product.id);
                };
            });
            return idMax + 1;   
    };

    async getProducts(){
        try {
            if(fs.existsSync(this.path)) {
               const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
               return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        };
    };

    async getProducById(idProduct){
        try{
            const products = await this.getProducts();
            const productById = products.find((product)=>product.id===idProduct);
            if(productById){
                return productById;
             }else{
                return "Not found"
             };
        }catch(error) {
            console.log(error);
        };
       
    };
        
    async updateProductById(id,product){
      try{
        const products = await this.getProducts();
        const indexProductById = products.findIndex(product=>product.id===id);
        if (indexProductById != -1){
            const updateProduct = {
                id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail : product.thumbnail,
                code : product.code,
                stock: product.stock,
                category : product.category,
                status: product.status
            }
            products[indexProductById] = updateProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return true;
        } else return false
      } catch(error) {
        console.log(error);
        };  
    };

    async deletProduct(idProduct) {
        try {
            const products = await this.getProducts();
            const indexDeletProduct = products.findIndex((product) => product.id === idProduct);
            if (indexDeletProduct !== -1) {
                products.splice(indexDeletProduct, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log(`Producto con ID ${idProduct} eliminado.`);
                return true;
            } else {
                console.log(`Producto con ID ${idProduct} no encontrado.`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    
};

    











