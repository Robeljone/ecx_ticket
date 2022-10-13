import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [tech, setTech] = useState([]);
  const [session_da,setSession] = useState("");
  const emp_login = async () => {
    const uname_con = uname + '@ecx.com'
    const data = [uname_con, pass];
    const res = await axios.post('http://10.3.5.115:5000/emp_lo', data)
    if(res)
    {
       sessionStorage.setItem('session_data',res.data)
       window.location.reload(true);
    }
  }
  useEffect(() => {
    const session_da = sessionStorage.getItem('session_data')
    if(session_da==null)
    {
      sessionStorage.removeItem('session_data')
    }
  }, [])
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            IT Help Desk Request Login
          </h2>
        </div>
        <div className="container">
          <form className="mt-12 space-y-8" onSubmit={emp_login}>
            <div className="rounded-lg shadow-sm -space-y-px">
              <div className="row">
                <div>
                  <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    placeholder="Enter User Name Here"
                    value={uname}
                    onChange={(e) => setUname(e.target.value)} />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter Password Here"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
