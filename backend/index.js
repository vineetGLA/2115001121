const express = require('express');
const cors=require('cors');
const  productRoute=require('./routes/product')

const options = {
    origin: 'http://localhost:3000',
    credentials: true,
};


const app = express();
const port = 4000;
app.use(express.json());

app.use(cors(options));

app.use(productRoute);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
