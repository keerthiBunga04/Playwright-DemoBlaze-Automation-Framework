class ProductApiClient {
    constructor(request) {
        this.request = request;
        this.baseURL = process.env.API_BASE_URL;
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