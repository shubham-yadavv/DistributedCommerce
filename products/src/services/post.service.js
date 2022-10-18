const {ProductRepository} = require('../database');


class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async CreateProduct(productInputs){

        const productResult = await this.repository.CreateProduct(productInputs)

        return productResult;
    }

    async GetProducts(){
        const products = await this.repository.Products();

        let categories = {};

        products.forEach(product => {
            if(!categories[product.category]){
                categories[product.category] = [];
            }

            categories[product.category].push(product);
        });

        return categories;
    }

    async GetProductDescription(productId){
        
        const product = await this.repository.FindById(productId);

        return product.description;

    }

    


}

module.exports = ProductService;
