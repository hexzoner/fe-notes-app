import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import ThemesSwap from "@/components/ThemesSwap";

const RootLayout = () => {
  const [loading, setLoading] = useState(false);
  const [audioRef, setAudioRef] = useState(document.getElementById("audio"));
  const aRef = useRef(null);

  useEffect(() => {
    if (!audioRef) {
      setAudioRef(document.getElementById("audio"));
    }

    // const handleEnded = () => {
    //   console.log("Audio has ended");
    //   // Add any additional logic you need when the audio ends
    // };

    // const handlePause = () => {
    //   console.log("Audio has paused");
    //   // Add any additional logic you need when the audio pauses
    // };
    // if (aRef.current) {
    //   aRef.current.addEventListener("ended", handleEnded);
    //   aRef.current.addEventListener("pause", handlePause);

    //   // Clean up event listeners on component unmount
    //   return () => {
    //     aRef.current.removeEventListener("ended", handleEnded);
    //     aRef.current.removeEventListener("pause", handlePause);
    //   };
    // }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={1500} theme="colored" />
      <div className=" bg-neutral-content text-neutral border-b-[1px] border-primary border-opacity-50">
        <div className="navbar max-w-[1000px]  m-auto">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Notes app</a>
            <ThemesSwap />
            <audio
              ref={aRef}
              id="audio"
              onPlay={() => {}}
              onEnded={() => console.log("Ended")}
              onPause={() => {}}
              controls={true}
              className={`scale-90 ${audioRef && audioRef.paused && false ? "opacity-0" : "opacity-100"}`}></audio>
          </div>
          <div className="flex-none">
            <ul className="flex gap-2 px-1">
              <li>
                <NavLink
                  className={({ isActive }) => `font-bold text-lg p-2 rounded-lg 
               ${isActive && "underline underline-offset-[24px] decoration-[6px]"}`}
                  to="/">
                  Diary
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/school-notes"
                  className={({ isActive }) => `font-bold text-lg p-2 rounded-lg 
               ${isActive && "underline underline-offset-[24px] decoration-[6px]"}`}>
                  School Notes
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet context={{ audioRef, loading, setLoading }} />
    </>
  );
};

export default RootLayout;
