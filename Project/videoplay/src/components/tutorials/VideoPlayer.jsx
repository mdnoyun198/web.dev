import React from 'react';

function VideoPlayer() {
  return (
    <div className="w-full flex flex-col">
      {/* 16:9 Aspect Ratio Video Container */}
      <div className="w-full aspect-video rounded-xl overflow-hidden border border-[var(--theme-border)] bg-black/50">
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/HAnw168huqA?si=dummyIdHere" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>
      </div>

      {/* Video Details Section */}
      <div className="mt-4 pb-4 border-b border-[var(--theme-border)]">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">
          Tense Masterclass: Basic to Advanced
        </h2>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm font-medium text-[var(--foreground)] opacity-80">
            Instructor: Noyun
          </span>
          <span className="text-sm text-[var(--theme-color)] bg-[var(--theme-color-lite)] px-2 py-1 rounded-md">
            Grammar Series
          </span>
        </div>
        
        {/* Description Box */}
        <div className="mt-4 p-4 rounded-lg bg-[var(--background)] border border-[var(--theme-border)]">
          <p className="text-sm text-[var(--foreground)] opacity-80 leading-relaxed">
            এই ভিডিওতে আমরা Tense এর বেসিক থেকে এডভান্সড পর্যন্ত সব নিয়ম নিয়ে আলোচনা করেছি। 
            ভর্তি পরীক্ষা বা একাডেমিক পরীক্ষার জন্য এই ক্লাসটি খুবই গুরুত্বপূর্ণ। সম্পূর্ণ ভিডিওটি মনোযোগ দিয়ে দেখুন।
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;