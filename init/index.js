const mongoose = require("mongoose");
const initData = require("./data.js");
const Property = require("../models/property.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/A-360";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    await initDB();
    mongoose.connection.close();
}

const initDB = async () => {
    await Property.deleteMany({});

    const dataWithOwner = initData.data.map((obj) => ({
        ...obj,
        owner: "69660e34ba43cb0922e84c77",
        image: { 
            url: obj.image.url, 
            filename: "preview-image" 
        }
    }));

    await Property.insertMany(dataWithOwner);
    console.log("Database initialized");
};

main();