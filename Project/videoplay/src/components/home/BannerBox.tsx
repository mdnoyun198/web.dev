'use client'
import Image from "next/image";
import ReactPromoCard from "../ReactPromoCard";
function BannerBox() {
    return (
        <div className=" w-full mx-auto flex flex-col lg:flex-row  items-center justify-between lg:py-8 md:pt-20 lg:gap-12 lg:flex-1 min-h-full">

            <div className="flex flex-col justify-center items-center lg:items-start gap-3 py-8    ">

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold flex flex-col items-center lg:items-start ">
                    From Academic to <span className="text-blue-600">Admission</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                    Master of English with the best teachers
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full">

                    <button className="w-full sm:w-auto px-7 py-3.5 bg-blue-600  text-white font-semibold rounded-lg ">
                        View Courses
                    </button>
                    <button className="w-full sm:w-auto px-7 py-3.5 rounded-lg border border-(--theme-border) flex flex-row items-center justify-center gap-2">
                        <Image
                            src='/images/google-play.png'
                            alt="google-play.png"
                            height={22}
                            width={22}
                            className="dark:invert"
                        />
                        Download App
                    </button>


                </div>
            </div>

            <div className="lg:flex-1 w-full flex flex-col justify-center">
                <div className="aspect-video sm:aspect-8/4 md:aspect-8/3  lg:aspect-4/3 w-full  lg:max-w-xl self-center lg:self-end ">

                    <ReactPromoCard />


                </div>
            </div>

        </div>
    );
}

export default BannerBox;