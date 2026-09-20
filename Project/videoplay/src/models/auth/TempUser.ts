import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    otp: { type: String, required: true },
    try: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, expires: '15m' }
});



const TempUser = mongoose.models.TempUser || mongoose.model("TempUser", userSchema);

export default TempUser;