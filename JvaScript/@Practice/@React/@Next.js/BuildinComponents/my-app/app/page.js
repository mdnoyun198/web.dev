import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center m-5 gap-5">


      <Image
        src="https://www.menucool.com/slider/prod/image-slider-3.jpg"
        width={100}
        height={100}
        alt="Picture of the author"
      />


      <img width={100} height={100} src="https://www.menucool.com/slider/prod/image-slider-3.jpg" alt="" />
      

       <div className="container my-5 size-80 bg-red-300 relative">
      <Image className="mx-auto object-cover" fill={true} src="https://www.menucool.com/slider/prod/image-slider-3.jpg" alt="" />
     </div>

    </div>

  );
}
