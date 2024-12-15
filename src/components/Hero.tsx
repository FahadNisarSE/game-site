import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoElement = useRef<HTMLVideoElement>(null);

  const getNextIndex = () => (currentIndex % totalVideos) + 1;

  const handleVideoLoad = () => setLoadedVideos((prev) => prev + 1);

  const handleMiniVideoClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(getNextIndex());
    }
  };

  useGSAP(
    () => {
      if (isTransitioning) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoElement.current?.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
          onComplete: () => {
            setIsTransitioning(false);
          },
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSource = (index: number) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  return (
    <div className="relative h-dvh w-screen overflow-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-gray-500"
      >
        {/* Videos */}
        <div>
          {/* Mini Video for Next Transition */}
          <div className="absolute-center z-50 size-64 cursor-pointer rounded-lg overflow-hidden">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoElement}
                src={getVideoSource(getNextIndex())}
                loop
                muted
                autoPlay
                id="current-video"
                className="size-64 object-cover scale-150"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* Transitioning Video */}
          <video
            ref={nextVideoElement}
            src={getVideoSource(currentIndex)}
            loop
            autoPlay
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover"
            onLoadedData={handleVideoLoad}
          />

          {/* Background Video */}
          <video
            src={getVideoSource(currentIndex)}
            loop
            autoPlay
            muted
            className="absolute left-0 top-0 w-full h-full object-cover"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Hero Heading */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        {/* Overlay Content */}
        <div className="absolute top-0 left-0 z-40 w-full h-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Secondary Heading */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
}
