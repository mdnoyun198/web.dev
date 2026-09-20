import React from 'react';

// ডামি নোটস ডেটা (পরে আপনি API বা ডাটাবেস থেকে ডাইনামিক করতে পারবেন)
const notesData = [
  {
    id: 1,
    title: 'English Grammar Masterclass',
    description: 'Complete notes on Tense, Article, Preposition, and Right form of verbs.',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: 'Vocabulary Builder (Top 500)',
    description: 'Essential vocabulary for academic exams and university admission.',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'HSC English 1st Paper Suggestions',
    description: 'Important paragraphs, story writing, and summary suggestions.',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 4,
    title: 'Spoken English Cheat Sheet',
    description: 'Daily conversational sentences and speaking practice formulas.',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 5,
    title: 'Idioms and Phrases',
    description: 'Most common idioms and phrases with Bengali meaning.',
    fileSize: '900 KB',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 6,
    title: 'Admission Question Bank Solve',
    description: 'Last 10 years English question solve for university admission.',
    fileSize: '5.5 MB',
    fileType: 'PDF',
    downloadUrl: '#'
  }
];

function NotesBox() {
  return (
    <div className="w-full">
      
      {/* হেডিং সেকশন */}
      <div className=" text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Download <span className="text-blue-500">Notes & PDF</span>
        </h1>
       
      </div>

      {/* নোটস গ্রিড সেকশন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-0 gap-4 p-4">
        {notesData.map((note) => (
          <div 
            key={note.id} 
            className=" border border-(--theme-border) rounded-xl p-6 flex flex-col hover:border-(--theme-color) hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
    
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold line-clamp-1" title={note.title}>
                  {note.title}
                </h3>
                <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded-full mt-1 inline-block">
                  {note.fileType} • {note.fileSize}
                </span>
              </div>
            </div>

            {/* ডেসক্রিপশন */}
            <p className="text-sm  mb-6 grow line-clamp-2">
              {note.description}
            </p>

            {/* ডাউনলোড বাটন */}
            <a 
              href={note.downloadUrl} 
              download 
              className="mt-auto w-full text-sm flex flex-row items-center justify-center rounded-xl gap-2 costem-input"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download PDF
            </a>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default NotesBox;