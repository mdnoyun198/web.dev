import mongoose from "mongoose";


const passwordSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    try: { type: Number, required: true },
    password : String,
    createdAt: { type: Date, default: Date.now, expires: '15m' }
});



const PasswordReset = mongoose.models.PasswordReset || mongoose.model("PasswordReset", passwordSchema);

export default PasswordReset;