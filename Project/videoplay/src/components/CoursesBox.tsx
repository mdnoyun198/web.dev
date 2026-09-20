'use client'
import Image from "next/image"
import { Star, User, Clock, ShoppingCart, Bookmark } from "lucide-react"

function CoursesBox() {
  // কোর্সের ডেমো ডেটা (কপিরাইট এড়াতে ভিন্ন নাম ব্যবহার করা হয়েছে)
  const courses = [
    {
      id: 1,
      title: "English Fluency Masterclass: Zero to Hero",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=450", // Placeholder 16:9 Image
      rating: 4.97,
      reviews: 243,
      students: 4802,
      duration: "50h",
      originalPrice: "৳ 10,000",
      currentPrice: "৳ 5,000"
    },
    {
      id: 2,
      title: "IELTS Premium Preparation",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=450", // Placeholder 16:9 Image
      rating: 4.90,
      reviews: 91,
      students: 1250,
      duration: "25h",
      originalPrice: "৳ 13,000",
      currentPrice: "৳ 6,500"
    }
  ]

  return (
    <div className="w-full mt-0 lg:mt-8">
      
      {/* 
        Grid Layout: 
        Mobile: 1 column
        Tablet/MD: 2 columns 
        Desktop: 3 columns (Change to lg:grid-cols-2 if you want strictly 2 columns on large screens)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 gap-x-2 gap-y-6 sm:gap-x-4 sm:gap-y-8 sm:px-4 md:gap-6 md:px-6">
        
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="flex flex-col bg-background border border-(--theme-border) rounded-xl overflow-hidden hover:border-blue-500 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            
            {/* Image Section (16:9 Aspect Ratio) */}
            <div className="relative aspect-video w-full bg-gray-100 dark:bg-neutral-800">
              <Image 
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
              {/* Bookmark Button */}
              <button className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm text-white transition-all">
                <Bookmark size={18} />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1 gap-3">
              
              {/* Ratings */}
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white ml-1">
                  {course.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({course.reviews})
                </span>
              </div>

              {/* Title: line-clamp-2 ও min-h দিয়ে সব কার্ডের হাইট সমান রাখা হয়েছে */}
              <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 min-h-14 leading-snug">
                {course.title}
              </h3>

              {/* Meta Info (Students & Duration) */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-auto pt-2">
                <div className="flex items-center gap-1.5">
                  <User size={16} />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Footer Section: Price & Cart Button */}
            <div className="p-4 border-t border-(--theme-border) flex items-center justify-between">
              
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 line-through decoration-1">
                  {course.originalPrice}
                </span>
                <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                  {course.currentPrice}
                </span>
              </div>
              
              {/* Improved Cart Button */}
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold text-sm dark:bg-transparent dark:hover:bg-blue-600 dark:text-blue-500 dark:hover:text-white">
                <ShoppingCart size={18} />
                Add to cart
              </button>

            </div>
            
          </div>
        ))}

      </div>
    </div>
  )
}

export default CoursesBox