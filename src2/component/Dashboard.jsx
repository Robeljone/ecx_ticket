import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function Dashboard() {
  const [empname, setName] = useState("");
  const [requpro, setRequpro] = useState("");
  const [requpro_arr, setRequpro_arr] = useState([]);
  const [prio, setPrio] = useState("");
  const [addition, setAdditional] = useState("");
  const [techsup, setTechsupp] = useState("");
  const [file, setFile] = useState();
  const [uploadname, setUploadName] = useState("");
  const [response, setResponse] = useState("");
  const [emp_list, setEmplist] = useState([]);
  const [message, setMessage] = useState("");
  const [enable, setEnable] = useState(false);
  const [emp_email, setEmp_email] = useState("");
  const [session_user, setSession_user] = useState("")
  const [region, setRegion] = useState("")
  const [depart, setDeapart] = useState("")
  const [isaddt, setIaddTrue] = useState(false);
  const [serch, setSerch] = useState("");
  const [na, setNa] = useState("");
  const [isTr,setIstr] = useState(false)
  var allowedextension = ['image/jpg', 'image/png'];
  const tech_list2 = [];
  const data = [emp_email, requpro, prio, uploadname, addition, techsup];
  const formData = new FormData();
  useEffect(() => {
    list_emp();
    list_request_all();
  }, [])
  const setRe = (e) => {
    if (e.target.value == 'Other_Problem') {
      setIaddTrue(true)
      setRequpro(e.target.value)
    }
    else {
      setIaddTrue(false)
      setRequpro(e.target.value)
    }
  }
  const ser = async () => 
  {
  const respo = await axios.post('http://localhost:5000/serach_user', [serch])
  if(respo)
    {
      setNa(respo.data[0].position)
      setIstr(true)
    }
  };
  const logout = () => {
    sessionStorage.removeItem('session_data')
    window.location.reload(true);
  }
  const saveFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadName(e.target.files[0].name);
      const size_t = e.target.files[0].size;
      const type_t = e.target.files[0].type;
      if (size_t > 200000) {
        alert('File Not More than 2MB Please change Your File')
      }
      else if (!type_t === 'image/png') {
        alert('File Type mismatch')
      }
      else {
        setEnable(true);
      }
    }
    else {
      alert("Attached file is not selected ")
    }
  };
  const uploadfile = async () => {
    formData.append("file", file);
    formData.append("fileName", uploadname);
    const api1 = "http://10.3.5.115:5000/upload";
    const res = await axios.post(api1, formData);
    if (res) {
      alert("upload success");
    }
  };
  const savetick = async () => {
    try {
      if (!file) {
        const api2 = "http://10.3.5.115:5000/savereq";
        const respo = await axios.post(api2, data);
        if (respo) {
          alert(respo.data)
        }
      } else {
        const api2 = "http://10.3.5.115:5000/savereq";
        const resp = await axios.post(api2, data);
        if (resp) {
          alert(resp.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closetick = async () => {
    try {
      if (!file) {
        const api2 = "http://10.3.5.115:5000/closereq";
        const respo = await axios.post(api2, data);
        if (respo) {

        }
      } else {
        const api2 = "http://10.3.5.115:5000/savereq";
        const resp = await axios.post(api2, data);
        if (resp) {

        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const get_emp_detail = async (e) => {
    const em_id = e.target.value
    const res = await axios.post('http://10.3.5.115:5000/get_detail', [em_id])
    if (res) {
      setDeapart(res.data[0].department)
      setRegion(res.data[0].division)
      setEmp_email(res.data[0].id)
    }
  }
  const list_emp = async () => {
    const emp_lists = await axios.get('http://10.3.5.115:5000/list_emp')
    setEmplist(emp_lists.data)
    setEmp_email(emp_lists.data[0].name)
  }
  const list_request_all = async()=>
  {
    const resp = await axios.post('http://10.3.5.115:5000/list_request_all')
    if(resp){
      setRequpro_arr(resp.data)
    }
  }
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            IT Help Desk Request Form
          </h2>
          <h2 className="mt-2 text-center text-2xl font-extrabold text-gray-500">
          </h2>
        </div>
        <div className="relative">
        </div>
        <div className="container">
          <form
            className="mt-12 space-y-8"
            onSubmit={savetick}
            encType="multipart/form-data"
          >
            <div className="rounded-lg shadow-sm -space-y-px">
              <div className="row">
                <div>
                  <label className="inline-block mb-2 text-gray-500">
                    Employee Name
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={emp_email}
                    onChange={get_emp_detail}
                  >
                    {
                      emp_list.map((list, i) =>
                      (
                        <option value={list.id} key={list.id}>{list.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label className="inline-block mb-2 text-gray-500">
                    Department
                  </label>
                  <input type='text'
                    placeholder="Employee Location"
                    readOnly="readonly"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={region}
                  />

                </div>
                <div>
                  <label className="inline-block mb-2 text-gray-500">
                    Division
                  </label>
                  <input type='text'
                    placeholder="Employee Department"
                    readOnly="readonly"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={depart}
                  />
                </div>
                <div>
                  <label className="inline-block mb-2 text-gray-500">
                    Request urgency
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={prio}
                    onChange={(e) => setPrio(e.target.value)}
                  >
                    <option value="">Request priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Not-urgent">Not-urgent</option>
                  </select>
                </div>
                <div>
                  <label className="inline-block mb-2 text-gray-500">
                    Request Type
                  </label>
                  <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={requpro}
                  onChange={setRe}
                >
                <option value={"Other_Problem"} key={"1"}>Select Request</option>
                  {
                    requpro_arr.map((list, i) =>
                    (
                      <option value={list.name} key={list.id}>{list.name}</option>
                    ))
                  }
                  <option value={"Other_Problem"} key={"1"}>Other</option>
                </select>

                </div>
                {
                  isaddt &&
                  <div>
                    <label className="inline-block mb-2 text-gray-500">
                      Additional Info
                    </label>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={addition}
                      onChange={(e) => setAdditional(e.target.value)}
                    ></textarea>

                  </div>
                }
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Form
              </button>
            </div>
          </form>
          <div>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={saveFile}
          />
          <label className="inline-block mb-2 text-gray-500">
            Upload Errors Screeshots Here!
          </label>
          <button
            disabled={!enable}
            onClick={uploadfile}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Upload
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
