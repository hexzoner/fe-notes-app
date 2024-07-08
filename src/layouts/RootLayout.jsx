import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ThemesSwap from "@/components/ThemesSwap";

const RootLayout = () => {
  const [audioRef, setAudioRef] = useState(document.getElementById("audio"));
  useEffect(() => {
    if (!audioRef) setAudioRef(document.getElementById("audio"));
    // console.log(audioRef);
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={1500} theme="colored" />
      <div className=" bg-neutral-content text-neutral border-b-[1px] border-primary border-opacity-50">
        <div className="navbar max-w-[1000px]  m-auto">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Notes app</a>
            <ThemesSwap />
            {<audio id="audio" controls={true} className="scale-90"></audio>}
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
      <Outlet context={{ audioRef }} />
    </>
  );
};

export default RootLayout;
