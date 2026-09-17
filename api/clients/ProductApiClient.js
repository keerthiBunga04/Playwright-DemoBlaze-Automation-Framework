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
}

module.exports = ProductApiClient;