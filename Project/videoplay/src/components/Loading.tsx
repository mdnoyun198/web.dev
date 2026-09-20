import React from 'react';

const Loading = () => {
  return (
    // কন্টেইনারটিকে মাঝখানে রাখার জন্য
    <div className="flex items-center justify-center w-full h-full mx-auto min-h-50">

      {/* স্পিনার ডিভ */}
      <div
        className="w-12 h-12 border-4 border-(--theme--lite) border-t-(--theme--color) rounded-full animate-spin"
      ></div>

    </div>
  );
};

export default Loading;