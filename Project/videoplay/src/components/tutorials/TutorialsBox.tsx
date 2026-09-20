import React from 'react';
import VideoPlayer from './VideoPlayer';
import VideoPlaylist from './VideoPlaylist';

function TutorialsBox() {
  return (
    <div className="w-full">
    

      {/* মেইন গ্রিড লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {/* বাম পাশ: ভিডিও প্লেয়ার (২ কলাম জায়গা নিবে ডেক্সটপে) */}
        <div className="lg:col-span-2">
          <VideoPlayer />
        </div>

        {/* ডান পাশ: প্লেলিস্ট (১ কলাম জায়গা নিবে ডেক্সটপে) */}
        <div className="lg:col-span-1">
          <VideoPlaylist />
        </div>
      </div>
    </div>
  );
}

export default TutorialsBox;