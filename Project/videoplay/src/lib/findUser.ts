import { connectDB } from "./mongoDB";
import user from "@/models/auth/user";

export async function findUser(userId: string) {
    try {
        await connectDB();

        const product = await user.findById(userId).lean();

        return product;
    } catch (error) {
        console.log("Error fetching product:", error);
        return null;
    }
}