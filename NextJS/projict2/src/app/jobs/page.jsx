import Image from "next/image";
import Navbar from "@/components/Navbar";
export default function Home() {
    return (
        <div className="bg-white flex justify-center items-center">

            <header>
                <Navbar />
            </header>

            <h1 className="text-black self-center">tish is jobs page</h1>
        </div>
    );
}
