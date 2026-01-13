const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

if (typeof passportLocalMongoose === "function") {
    userSchema.plugin(passportLocalMongoose);
} else if (typeof passportLocalMongoose.default === "function") {
    userSchema.plugin(passportLocalMongoose.default);
}
module.exports = mongoose.model("User", userSchema);