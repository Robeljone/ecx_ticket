import React,{useState,useEffect} from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { Routes, Route} from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Sharedfolder from "./component/Sharedfolder";
import How from "./component/How";
const Home = () => {
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [isauth,setIauth] = useState(false)
  useEffect(()=>{
    const sta = sessionStorage.getItem('session_data')
    if(sta)
    {
      setIauth(true)
    }  
  })
  return (
    <div>
      <main>
        <button
          id="burger"
          onClick={openSidebar}
          className={`${
            isSidebarOpen ? "-translate-x-8" : "translate-x-0"
          } fixed top-2 transition transform ease-linear duration-500 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800`}
        >
          <FaBars className="w-5 h-5" />
        </button>
      </main>
      <div>
        <Routes>  
          <Route path="/sidebar" element={<Dashboard />}/>
          <Route path="/shared" element={<Sharedfolder />}/>
          <Route path="/how" element={<How />}/>
          <Route path="*" element={<Dashboard/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
