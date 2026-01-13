const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending" 
    },
    adminFeedback: {
        type: String,
        default: "" 
    }
});

module.exports = mongoose.model("Property", propertySchema);