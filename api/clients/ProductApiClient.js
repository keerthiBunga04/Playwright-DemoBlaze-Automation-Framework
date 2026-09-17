class ProductApiClient {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://api.demoblaze.com';
    }

    async getAllProducts() {
        return await this.request.get(
            `${this.baseURL}/entries`
        );
    }
    async getProductById(productId) {
        const response = await this.getAllProducts();

        const responseBody = await response.json();

        return responseBody.Items.find(
            product => product.id === productId
        );
    }
}

module.exports = ProductApiClient;