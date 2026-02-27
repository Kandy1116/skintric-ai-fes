import React from 'react';
import './landingPage.css';

const DiamondButton = ({ children, onClick, className }) => (
    <button onClick={onClick} className={`relative w-[25rem] h-[25rem] flex items-center text-black hover:text-gray-600 transition-colors ${className}`}>
        <div className="w-full h-full border border-dotted border-[#a0a4ab] rotate-45 absolute inset-0"></div>
        <div className="relative z-10 flex items-center space-x-[8px] text-xs font-sans tracking-widest whitespace-nowrap cursor-pointer">
            {children}
        </div>
    </button>
);

const LandingPage = ({ onTakeTest }) => {
  const [isHoveredRight, setIsHoveredRight] = React.useState(false);
  const [isHoveredLeft, setIsHoveredLeft] = React.useState(false);

  return (
    <div className="__className_5f0add antialiased text-[#1A1C] relative flex flex-col items-center justify-between min-h-screen bg-white font-normal overflow-hidden pt-12">
      <div 
        className="absolute top-0 right-0 h-full w-1/2 bg-slate-50 z-0"
        style={{
            opacity: isHoveredRight ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
        }}
      ></div>
      <div 
        className="absolute top-0 left-0 h-full w-1/2 bg-slate-50 z-0"
        style={{
            opacity: isHoveredLeft ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
        }}
      ></div>

      <header className="flex flex-row h-[64px] w-full justify-between items-center py-3 px-6 relative z-10">
        <div className="flex flex-row items-center">
            <span className="font-semibold text-[12px] tracking-wide">SKINSTRIC</span>
            <div className="w-px h-5 bg-black mx-2"></div>
            <span className="text-gray-500 font-semibold text-[10px]">INTRO</span>
             <div className="w-px h-5 bg-black mx-2"></div>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap font-semibold h-7 px-3 py-1 text-[10px] text-white bg-black">ENTER CODE</button>
      </header>

      <main className="flex-grow flex items-center justify-center w-full relative z-10">
        <div 
            className="absolute top-1/2 -translate-y-1/2 left-[-15rem]"
            onMouseEnter={() => setIsHoveredLeft(true)}
            onMouseLeave={() => setIsHoveredLeft(false)}
            style={{
                opacity: isHoveredRight ? 0 : 1,
                transition: 'opacity 1.5s ease-in-out',
                visibility: isHoveredRight ? 'hidden' : 'visible'
            }}
        >
            <DiamondButton className="justify-end">
                <i className="fa-solid fa-play fa-rotate-180"></i>
                <span style={{marginLeft: '8px'}}>DISCOVER A.I.</span>
            </DiamondButton>
        </div>
        
        <h1 
            className={`text-[75px] font-sans ${isHoveredRight ? 'text-left' : isHoveredLeft ? 'text-right' : 'text-center'} leading-none tracking-tight font-normal`}
            style={{
                transform: isHoveredRight ? 'translateX(-20vw)' : isHoveredLeft ? 'translateX(20vw)' : 'translateX(0)',
                transition: 'transform 1.5s ease-in-out'
            }}
        >
          Sophisticated<br />skincare
        </h1>

        <div 
            className="absolute top-1/2 -translate-y-1/2 right-[-15rem]"
            onMouseEnter={() => setIsHoveredRight(true)}
            onMouseLeave={() => setIsHoveredRight(false)}
            style={{
                opacity: isHoveredLeft ? 0 : 1,
                transition: 'opacity 1.5s ease-in-out',
                visibility: isHoveredLeft ? 'hidden' : 'visible'
            }}
        >
             <DiamondButton onClick={onTakeTest} className="justify-start pl-4">
                <span>TAKE TEST</span>
                <i className="fa-solid fa-play" style={{marginLeft: '8px'}}></i>
            </DiamondButton>
        </div>
      </main>

       <footer className="w-full text-left z-10 px-6">
          <p className="text-xs font-sans leading-tight mb-12">
            SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
            HIGHLY-PERSONALIZED ROUTINE TAILORED TO<br />
            WHAT YOUR SKIN NEEDS.
          </p>
      </footer>
    </div>
  );
};

export default LandingPage;
