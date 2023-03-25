const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: "https://img.icons8.com/color/256/kawaii-french-fries.png"
    }
})

module.exports = mongoose.model('productos', productSchema)