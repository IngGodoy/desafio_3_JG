import fs from "fs";

export class ProductsManager{
    constructor (){
        this.path = "./products.json"
    };

    async addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock){
        try{
            const products = await this.getProducts();
            const newProduct= {
                id: this.#newIdProduct(products),
                title : newTitle,
                description: newDescription,
                price : newPrice,
                thumbnail : newThumbnail,
                code : newCode,
                stock : newStock
             };

             let checkProductByCode = products.find((product) => newProduct.code === product.code);
   
             if (!checkProductByCode && this.#checkNewProdut(newProduct)) {
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log(`El producto ${newProduct.title} ha sido agregado.`);
             } else {
               console.log(`invalid product error`);
             };
        }catch (error) {
            console.log(error);
        };
    };

    #checkNewProdut(newProduct){
        for ( let key in newProduct){
            if(!newProduct[key]){
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
               console.log("ver productos:")
               console.log(productsJSON) //borrar
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
        const updateProduct = {
            id,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code:product.code,
            stock: product.stock
        }
        products[indexProductById] = updateProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
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
            } else {
                console.log(`Producto con ID ${idProduct} no encontrado.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
};

//const prueba = new ProductsManager();
//prueba.getProducts();










