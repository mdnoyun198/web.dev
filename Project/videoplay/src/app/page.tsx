import BannerBox from "@/components/home/BannerBox";
import ServiceBox from "@/components/home/ServiceBox";
import CoursesBox from "@/components/CoursesBox";
import Footer from "@/components/Footer";
export default function Home() {
  return (

    <main className="w-full max-w-(--max-width) mx-auto md:px-4 pb-2 flex-1 flex flex-col">
      <BannerBox />
      <ServiceBox />
      <CoursesBox />
      <Footer />
    </main>

  );
}
