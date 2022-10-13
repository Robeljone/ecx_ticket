import React from "react";
import { HiOutlineSearch, HiTicket, HiX } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { links } from "./data";
import { useGlobalContext } from "./context";
import { Route, Router, Routes } from "react-router";
import AdminDashboard from "./Admin/AdminDashboard";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <div
      className={`transition-all  duration-500  fixed top-0 ${
        isSidebarOpen ? "left-0" : "-left-64"
      }`}
    >
      <div className="flex h-screen overflow-y-auto flex-col bg-white  w-64 px-4 py-8 border-r min-h-screen relative">
        <button
          onClick={closeSidebar}
          className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
          <HiX className="w-5 h-5" />
        </button>
        <div className="rounded-lg ...">
          <img
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAA3lBMVEX///8AAAD/wiFzpTTv7+/R0dH/vgD8/PxzozL+5av3+vLf6NTGxsZqnyD29vbd3d3/1nmSkpLO3rv/0mf/wBaGhob7/fmYmJi0tLRISEiOjo5nZ2fp6enY2NiAgIA9PT0mJiZvb28aGhpRUVFfX19CQkL/8dUtLS24uLj+7cqmpqbMzMxPT0+qqqplZWU1NTUXFxdmnhbV4ceKs12UuWz+9+atx5D+6b2pxIlemwCDrlC50KDo7+HD1q+cvnl5pz7+247+xjT+yk7+5rK3zpz+4J//02r+xz799N3+y1Ap6HG/AAANKElEQVR4nO2dDXubRhLHd20wORfB0VrmRYCEAYugV6dtkrZ3ado0be77f6GbmV0kkGXLsh07Wu//eRJLy7La/TE7OyAxMKalpaWlpaWlpaWlpaWlpaWlpaWlpb7On7sD36DevNdUNvXml1+/e+4+fGt60zvu/fbcnfjGBEyOez/+57m78ZT6bpf+C0yAyn+fu6NPp7e/9HbpmHT10+lz9/WJ9P7q+K7q9b5/7t4+id737owETeXDCzCV/ZCAqfyuvKm8vfvEaaD0FF9/9vAlDRLVQ9q3e06c496x6jPnrztayasVEuUX444vudFi1uFJJ2hTcwa1kbzqfTi/Qaenp+ffI5VOcP/xj5+fr+dfTV0r+XBrXTrfaZ0E/vzDyZmCUPZBAkx6v7cuFrw7Ojs6Ug/KXkjYm1/eWut3H0+OUGdHakHpILnahYR992b9+sufAolqltKJS3ZaSUefzs6OjhSEsqeVdPT55GgtdaZPK1R7dXz1ds+9P6kIpRO97o0EVp0OlD++fIUuPrW6VvL+Hi1sQDl8S3molaDeqTV9HgOJxV53oRz29Hn7CEhQG5Zy+YhdfGo9hpUIdaAcnR2upTwekk1LOVgonej1gUhY16ccHej0+e0RrQT1+vB9yhYkTuK2lFjt6k5S1X5dmQa+iWGz09powHvj8KdPF8lfVGbzjsxVZSvIV6XjmrEK/k5bjQ1F7ddnBw3l9Pg6kk0mSVM5GLWLfSgZwN9q1VgN7zx8cdmGcvKvpx3Sg3W6vvi+9iXIJMwbha4otQaEYphFdZSFnGNxDAWLZm4ZaD3iTRvKITNprEQwiTdrWlMk4klALJ7R6H0oq2VRCq9t+bo1fQ6YydX6Cwlk4m7WLNB3XCe1gGLytyyBV9lqw6UCTHp/rQu3MUFfUVjsmrBuSq/A/S6N9YbV6nPATFpfbm5hgr5iZLAtKmRlXINmrfLXyjPxOwtMWy4aEMQtsCbl7XL1mcCIRzc04ZFr9Tf3UZ4JGkP/hiacMazcThOarKQgk+4KU904dWT1fBWaNFKQSRlKlXj4o22r80oFBXN2t1BBJmthzJFui+JWwmhWLshrKc0EB3sHJtON4EVBJqYRS2FUcjuTObGru4UKMul6j6hzyWBDUH1ZrkL8Rsozqa7bwUq4Fqdu52QHpTwTGaxulUfzKoP/J+1i5ZlgHHuDQ3FFtGa0r6SgLpVn4l+bG40gWhshi5m89NZIfSZoBjzY0sA6wp12TUl9JmQGW6Dg6XApXppdn6Mgk2vOI6P4bV1skPOIWq416wT4CjLxg0YzefJHUHhRT0zXtP2CLAmvN86b3ei608rNKsikJTk3yM+2hPFK3pllfvuCwctgwuK0XewLJ9M690Pnsvo2SDEmbtpvq7XCOnaUlcNhkfkT/E7U97yoHdGbkRc1l1kUY/Io0kyuSzEmxsS8vxqXqxiTGX+AQtmIYkws4wFqfo+iGJNHkWZyXQpcPzk+bmd3sZhDcYcjvjbH/+KUNS9bStohW3v7l6MjBZisoVh137YjehUUCTPqFILTKnSBVN2v8Lcn/izLmOGmThzQ9XorcdnMh7i+9sT36F+OzpRgsoISzCZpUuCi6ji5bfvmLLWTQZynZm2bGXOmbuHbBZiInzjGwjQZK8xhkrHSsf2YvkhvITlEJi31JBSzmDlWOIO5UCalkVdZ7RSuv4iN2Pd8gxmLpKjrfh2AxQzNgQsnxq5RBDUwqdIarya0kRwek/NfO7e7yfv7Qof1gwzHbEG4YVHI4UUDcB90YcDIJ5bL+hOwI2MiHErlA6LSceh8sfMTv6OT188ysgfotAXlVQOlcJ0Fs1MrYS6AYCEceztl09hx6NdbAfmayI8jh9XCf8C08tnCcObJNSTvnmto91cbyvErASVwnT5z+v2UxXiVBOeDXUGpWdDVNfFDvzi1PYPZ4irbLHZn4F7C2AIkZweOZAPK8dWbW6paW37Q1tnuHP7EETrd6lPuqdddKzlQJNunzz2lhpWgtq8+99DliSpIwBH8eGefcpu69+6cHTQSsJQOlHueEHbuxzh4JFug7FhituidQhNHqAPl1dX+lqIeEtBPHZ+yL5R3SvmSRuc/dZbk/bJ9biA5xLsAt6sNZb9cH2paCWkNpZNfbOcdfQojYeyDgNL7vZVf7PKPzzv2UnbiCFE+0HZevvPPJ7uuCimOBCzlqnVnIBjJnye7rpRt3E+s1sQR+tA+3/l4ArHpycfb6n9S3UpA52tXcinzi/3z9w8360x9JC19Xl0LObtFLwnJOgndnaU6ko/7E1EcyeU/eyNR3kr2Z6K6laA+n5ztBvGCrIT05X97mcqhZTm5p1Zr8W1LMenk4BK/3FvNcvzn33//+3a9hInTiLzKyafn7sa3JfQqB/dria+u3dcKXqC+/LPrmtIL1PmhZz3V0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tL6FhV7oMhktUcvXFZHAWOTyHdYENFNwFbl2ZSNoaq9Cm+HNbwoEXu2kvWbvo+Frk93lEMDngG7iioVtoa7UWo6p/LoRlo38HybEjjUUcXciDpQxxF0BvfAj7Sp0IEylznyUyuvcpiPTVUR5WG1xQboMjVFCbwss/ag7TgSg9tTpkiaZl2IdDUVG2GmQQ9T3RZ8CB0zQijOLZHclHKIJSJbIaZVazK5GJhvO5O52HDkc/rjivw3JaUas0U6THfB18mq+QhqWWM+aBKZjQzKZjcU6Q4jKnMN/NiKUrrhsyZ4bFE/Mn6B4BaiOR/T90JTeBCSkPZrBrcvExhgOM8razpecj6+mMBHDOgDDDagAeWUcT2isn6B+dVcwSRbJ55zoA9hGGC/pxf8wqCc5BFlE8Kb9Et6/EOf+m4N+XJK/Uz5RbRAWlCUsclyzPlyHEK1kRPLbIdwGIp5EUPVBfybU4PLorAsSpufUh54YymepOBT8yV2DfOwjsZwQOXg7sFEJlvsN9g7TGy0nQwf8+HzC4dN+VAyscbLvEle78uDUULvTAKQU2JLMIUhYcDDCpig5QATPRY4GhwoDGggmFDiYbx5H/Y3beAimdC9dBNAF8KHgcGEmGClzWTCwzEeBZ+eRTLEruWUc9RpD+5RmaTYPRsH4qMBQC8lk5iHfRoEDTqUbQX4BhoAwwGCQ0qYi1mWS+YsCdMcKc3QwmBIDtq/0zAZ0TMTrAX3ffn0BE/OTqiRjuDlTGbObDOpuTfEqenzJRwYZJKsHr5wfya1mzhtJnPD8FZMcsxRmCB4YjKHMsHE5oUtk5zGMi0uoYM9wJQXo5InBs8vgKixHC547PI5PsSLPAVVJCY+phLtMAEQg0KmOoRumPSwNE94slTaDzIxjIyYDHg1wP74MMVDOBYBkkvag9v6XJcdTLh42suKiZBkQibg4tyAA1F5a3/i8SiRXUzk42JmlKUcXbPBFxEPTJ5eQDsun6bcDHgERmON0IomyJiYVEinyyThy2VpNUw45V91RUZI4fWJCQmYgFd1U9zR5ymgnEPXwDPHxnxeBHJw23L67mIyGi+rOzFBFZZkkvPAkU7WvMYk5uOApwG3L8j7T2tee9yGCX8HJph5WOaKBCbjET6/xxX+fAuTmC+dGVqmzzPAnkHXwJkbuEPUGty+TCqHUnGsmOS2nbXmTriaO3w6qCwmmMAI/OpCTFdXutiKmODcASYuL1JujODwTvg04Wk+dLHRIS4fcu4sts4dXG/dFRPDQVOMaIjgfRYNk4Ftk6e2+bjy0V5h7oB14jTCNp1gxD0xOGfvW553+dgBrA54XG3hTySCgI6c6ChlxaVE3FQNFp85bF0441EZQthjQrdzYzkepzGOf4rHNBA+Fpik13wsk5GIZCL8x4Kn2Lu+TGRs0QeTjxXTC8gDE2A2gq7R0gagva+17pDD6su1uMUEyrNsIZ1sIbwajCoVRmNSB6FXI+heAEOG5TEwcERkGANMLAxMLFiMMrbJJGgzkWvxyF1CPycy72xr3cn5MMuEGee4HboWU8DyMCZp7Xf8SYdJvOSlv8SudJn0EYcvn54Dc+Ei8nA68CjHQYNpIDWbjaG3NewdiXA0wZ2nHuUVhkXELlYx201M/BrOGTBeK3DShZjF2WsxcdAwYPx9YoKRUEBh0bwaCyZycHvJXGWgTPlSrsWSyZyj+w9wuwiKli0mQ8RUNUm5yf/6zFjIWLoGsAluHEPVFAy9AsswyN1Q1aEjY3uK/haCycU1JiK2r2HLDBHHLMaUxDDbiAnMFIrw0E5zaHdKrmiGKfPkvF4Pbi+54XQ6DdEi65Ky7w1K+LhZOTVYvxReIsvxfA7KcsEkDkvbKUrMQjct5QmW2Z9mmFDLm2ZorbNhxCwf4GTDGfOGNZwAglsuhrjNHuR4SsiqLMx8RGplJbolaFKcmdhlKfOcQzem07IyyxBwhEPgZ9Swt2VNsapfFsweYqdm8CoYpnhyVtJkqfp55rnMLZvBaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWl9w/o/95BYgJSy/a4AAAAASUVORK5CYII="
          />
        </div>
        <div className="relative mt-6"></div>
        <div className="flex flex-col mt-6  justify-between flex-1">
          <nav className="text">
            {links.map((link, index) => {
              const { id, url, text, icon } = link;
              return (
                <a
                  key={id}
                  href={url}
                  className={`capitalize flex items-center px-4 py-2 ${
                    index === 0 ? "bg-gray-200 text-gray-700" : null
                  } ${
                    index > 0
                      ? "mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform"
                      : null
                  } rounded-md`}
                >
                  {icon}
                  <span className="mx-4 font-medium">{text}</span>
                </a>
              );
            })}
            <hr className="my-6" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
