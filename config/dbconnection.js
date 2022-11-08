const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(`mongodb://${process.env.LOCALHOST}`).then(() => {
    console.log("Connection db ")
}).catch((err) => {
    console.log("error",err)
})

module.exports = mongoose