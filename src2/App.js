import React,{useState,useEffect} from "react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Sharedfolder from "./component/Sharedfolder";
function App() {
  const [isauth, setIauth] = useState(true)
  useEffect(()=>{
  const sta = sessionStorage.getItem('session_data')
  if(sta)
  {
    setIauth(false)
  }  
})
  return (
    <>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      {
       isauth && <Sidebar />
      }
    </>
  );
}

export default App;
