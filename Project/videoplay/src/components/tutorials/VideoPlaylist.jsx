import React from 'react';

// কিছু ডামি ভিডিও লিস্ট (শুধু দেখানোর জন্য)
const dummyPlaylist = [
  { id: 1, title: 'Tense Masterclass: Basic to Advanced', duration: '45:20', isActive: true },
  { id: 2, title: 'Right Form of Verbs - Rule 1 to 10', duration: '32:15', isActive: false },
  { id: 3, title: 'Preposition Tricks for Admission Exam', duration: '28:40', isActive: false },
  { id: 4, title: 'Vocabulary Memorization Techniques', duration: '15:10', isActive: false },
  { id: 5, title: 'Subject-Verb Agreement Short Tricks', duration: '22:55', isActive: false },
  { id: 6, title: 'Completing Sentence Board Questions Solve', duration: '50:00', isActive: false },
];

function VideoPlaylist() {
  return (
    <div className="w-full flex flex-col border border-[var(--theme-border)] rounded-xl overflow-hidden h-full lg:max-h-[600px]">
      
      {/* Playlist Header */}
      <div className="p-4 border-b border-[var(--theme-border)] bg-[var(--theme-color-lite)]">
        <h3 className="font-bold text-[var(--foreground)] text-lg">
          Grammar Full Course
        </h3>
        <p className="text-xs text-[var(--foreground)] opacity-70 mt-1">
          1/6 Videos • Updated Today
        </p>
      </div>

      {/* Playlist Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto">
        {dummyPlaylist.map((video, index) => (
          <div 
            key={video.id}
            className={`flex items-start gap-3 p-3 cursor-pointer border-b border-[var(--theme-border)] last:border-0 transition-all duration-300
              ${video.isActive 
                ? 'bg-[var(--theme-color-lite)] border-l-4 border-l-[var(--theme-color)]' 
                : 'hover:bg-[var(--theme-color-lite)] border-l-4 border-l-transparent'
              }
            `}
          >
            {/* Play Icon / Number */}
            <div className="mt-1 flex-shrink-0 text-[var(--foreground)] opacity-60 text-sm w-5">
              {video.isActive ? (
                <span className="text-[var(--theme-color)]">▶</span>
              ) : (
                index + 1
              )}
            </div>

            {/* Video Info */}
            <div className="flex-1">
              <h4 className={`text-sm font-medium line-clamp-2 ${video.isActive ? 'text-[var(--theme-color)]' : 'text-[var(--foreground)]'}`}>
                {video.title}
              </h4>
              <span className="text-xs text-[var(--foreground)] opacity-60 mt-1 block">
                {video.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default VideoPlaylist;