"use client";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";
import { useEffect } from "react";

const Hero = () => {
  const { primaryColor, tertialColor } = useThemeStore();

    const createStar = () => {
      const star = document.createElement("div");
      star.className = "star absolute w-[3px] h-[3px] rounded-full opacity-80";

      const space = document.getElementById("starBg");
      const spaceHeight = space?.clientHeight || 0;
      const spaceWidth = space?.clientWidth || 0;

      const initialX = Math.floor(Math.random() * spaceWidth) + 1;
      const initialY = Math.floor(Math.random() * spaceHeight) + 1;

      star.style.top = `${initialY}px`;
      star.style.left = `${initialX}px`;

      star.style.backgroundColor = primaryColor;

      const dir = Math.floor(Math.random() * 4) + 1;
      let animationFrameId: number;
      let lastTime = performance.now();
      const speed = 0.02; // pixels per millisecond

      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        const distance = speed * deltaTime;

        let currentTop = Number(star.style.top.slice(0, -2));
        let currentLeft = Number(star.style.left.slice(0, -2));

        if (dir === 1) {
          currentTop += distance;
          currentLeft += distance;
        } else if (dir === 2) {
          currentTop -= distance;
          currentLeft += distance;
        } else if (dir === 3) {
          currentTop += distance;
          currentLeft -= distance;
        } else {
          currentTop -= distance;
          currentLeft -= distance;
        }

        // Wrap around if out of bounds to simulate new stars appearing
        if (currentTop > spaceHeight) currentTop = 0;
        else if (currentTop < 0) currentTop = spaceHeight;

        if (currentLeft > spaceWidth) currentLeft = 0;
        else if (currentLeft < 0) currentLeft = spaceWidth;

        star.style.top = `${currentTop}px`;
        star.style.left = `${currentLeft}px`;

        animationFrameId = requestAnimationFrame(animate);
      };

      space?.append(star);
      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
        star.remove();
      };
    };

  useEffect(() => {
    
    const cleanupFunctions: (() => void)[] = [];
    
    // Create initial stars
    for(let i=0;i<=30;i++){
      const cleanup = createStar();
      cleanupFunctions.push(cleanup);
    }

    const checkBoundaries = () =>{
      const stars=document.querySelectorAll('.star');
      const space=document.querySelector('#starBg');

      stars.forEach(star=>{
        const htmlStar=star as HTMLElement
        const top = Number(htmlStar.style.top.slice(0,-2));
        const left= Number(htmlStar.style.left.slice(0,-2))

        const height=space?.clientHeight || 0;
        const width=space?.clientWidth || 0;

        if(top<-100 || left <0 || top>height || left>width){
          htmlStar.remove();
          const cleanup = createStar();
          cleanupFunctions.push(cleanup);
        }
      })
    }

    const boundaryInterval=setInterval(checkBoundaries,50);

    return ()=> {
      clearInterval(boundaryInterval);
      // Clean up all stars and their animations
      cleanupFunctions.forEach(cleanup => cleanup());
    }
  },[]);

  return (
    <>
      <div
        id="hero"
        className="flex justify-center flex-col items-center h-screen overflow-hidden relative"
      >
        <div
          id="starBg"
          className="absolute inset-0 overflow-hidden pointer-events-none"
        ></div>
        <div
          id="hero-text"
          className="h-screen flex flex-col justify-center items-center gap-5 relative bottom-[12vh] z-10 pointer-events-none"
        >
          <h1 className="text-center font-avant font-bold text-5xl w-[60vw]">
            Bringing Architecture to Life with Stunning Visuals.
          </h1>
          <p
            className="text-center font-beach text-3xl w-[40vw]"
            style={{ color: primaryColor }}
          >
            From interior design to architectural planning and 3D modeling, we
            bring your ideas to life.
          </p>
        </div>
        <div
          id="gallery"
          className="absolute -bottom-10 w-full flex justify-center items-start z-10"
        >
          {/* Left Video */}
          <div className="w-[350px] h-[200px] rounded-[28px] overflow-hidden mt-[150px] -mr-[50px] z-0 opacity-90 shadow-lg -rotate-z-20 border-[#FFF3E9] border-4">
            <video
              src="/videos/interior2.mp4"
              className="object-cover w-full h-full scale-112 animate-[zoom_20s_linear_infinite]"
              loop
              muted
              autoPlay
            />
          </div>

          {/* Center Video */}
          <div className="w-[600px] h-[350px] rounded-[28px] overflow-hidden z-20 border-[#FFF3E9] border-4">
            <video
              src="/videos/interior1.mp4"
              className=" object-cover shadow-2xl scale-112"
              loop
              muted
              autoPlay
            />
          </div>

          {/* Right Video */}
          <div className="w-[350px] h-[200px] rounded-[28px] overflow-hidden mt-[150px] -ml-[50px] z-0 opacity-90 shadow-lg border-[#FFF3E9] border-4 rotate-z-10">
            <video
              src="/videos/interior3.mp4"
              className="object-cover w-full h-full scale-112"
              loop
              muted
              autoPlay
            />
          </div>
        </div>
        <Image src="/images/grid.svg" alt="Grid" className="absolute right-0 bottom-0" width={509} height={379} />
      </div>
    </>
  );
};

export default Hero;
