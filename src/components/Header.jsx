import React from 'react';

const Header = () => {
  return (
        <header className="flex flex-row h-[64px] w-full justify-between items-center py-3 px-6 absolute top-0 left-0 z-20">
      <div className="flex flex-row items-center">
                              <span className="font-semibold text-[12px] tracking-wide text-[#11AA1C]">
              SKINSTRIC
          </span>
          <div className="w-px h-5 bg-black mx-2"></div>
                    <span className="text-gray-600 font-semibold text-[10px]">INTRO</span>
          <div className="w-px h-5 bg-black mx-2"></div>
          
      </div>
      <button className="inline-flex items-center justify-center whitespace-nowrap font-semibold h-7 px-3 py-1 text-[10px] text-white bg-black">ENTER CODE</button>
    </header>
  );
};

export default Header;
