const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
// Helper function to generate unique identifiers for products
let productStore={};
const generateUniqueProducts = (products) => {
    return products.map(product => {
        const productId = uuidv4();
        productStore[productId] = product; 
        return { ...product, id: productId };
    });
}

// Sample API URL for retrieving data (replace with the actual API)
const sampleApiUrl = 'http://20.244.56.144/test/companies/:companyname/categories/:categoryname/products';

// Helper function to sort products
const sortProducts = (products, sortBy, order) => {
    return products.sort((a, b) => {
        if (order === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
}

// GET /categories/:categoryname/products
exports.allProducts= async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, page = 1, sortBy = 'rating', order = 'desc', minPrice, maxPrice } = req.query;
    const companyname = 'SNP'; // Replace with the actual company name if dynamic
    console.log("8888888888888888",categoryname, top, page, sortBy, order, minPrice, maxPrice);
    // Validate input
    if (isNaN(top) || top <= 0 || isNaN(page) || page <= 0) {
        return res.status(400).send('Invalid parameters');
    }

    try {
        // Fetch data from the sample API
        const apiUrl = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`;
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzgyMzUwLCJpYXQiOjE3MjA3ODIwNTAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjExMGE0MDVhLWJiMjgtNGQ4Yy1hYWRjLWIxNjQ5ODA0YjJjZCIsInN1YiI6InZpbmVldC5zaW5naF9jczIxQGdsYS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiMTEwYTQwNWEtYmIyOC00ZDhjLWFhZGMtYjE2NDk4MDRiMmNkIiwiY2xpZW50U2VjcmV0IjoiTXZ4eHJqVkVGeG1md1BNTSIsIm93bmVyTmFtZSI6InZpbmVldCBzaW5naCIsIm93bmVyRW1haWwiOiJ2aW5lZXQuc2luZ2hfY3MyMUBnbGEuYWMuaW4iLCJyb2xsTm8iOiIyMTE1MDAxMTIxIn0.lBphEmzamTqbSPDzlAGU2hbwr9nC_y33PZotW3PpuXw"
        const response = await axios.get(apiUrl, {
            params: {
                top,
                minPrice,
                maxPrice
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        let products = response.data;

        // Filter products by price range
        if (minPrice) {
            products = products.filter(product => product.price >= minPrice);
        }
        if (maxPrice) {
            products = products.filter(product => product.price <= maxPrice);
        }

        // Sort products
        products = sortProducts(products, sortBy, order);

        // Generate unique identifiers for products
        products = generateUniqueProducts(products);

        // Pagination
        const totalProducts = products.length;
        const totalPages = Math.ceil(totalProducts / top);
        const startIndex = (page - 1) * top;
        const endIndex = startIndex + top;

        const paginatedProducts = products.slice(startIndex, endIndex);

        // Response with pagination details
        res.json({
            totalProducts,
            totalPages,
            currentPage: page,
            pageSize: top,
            products: paginatedProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products');
    }
};

exports.singleProduct=(req, res) => {
    const { categoryname, productid } = req.params;
    console.log(categoryname, productid);
    console.log("Request for product details:", categoryname, productid);

    const product = productStore[productid];

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.json(product);
}
