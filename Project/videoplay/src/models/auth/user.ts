import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" },
    image: String,
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    isAdmin: Boolean,
    status : {type: String, default: 'active'}
});

const user = mongoose.models.user || mongoose.model("user", userSchema);

export default user;