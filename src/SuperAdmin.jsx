import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { MDBDataTable,MDBBtn,MDBIcon } from "mdbreact";
import { CSVLink, CSVDownload } from "react-csv";
import { button } from '@material-tailwind/react';
import { list } from 'postcss';
function SuperAdmin() {
  const [countAct, SetCountact] = useState("")
  const [countAct1, SetCountact1] = useState([])
  const [req_list_type, SetReq_list_type] = useState([])
  const [countAct_lis, SetCountact_lis] = useState([])
  const [countPen, SetCountpen] = useState("")
  const [countClo, SetCountClo] = useState("")
  const [techsupp, SetTechsupp] = useState([])
  const [techsupp2, SetTechsupp2] = useState([])
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [expo_datas, setExpo_datas] = useState([])
  const [user_select, setUser_select] = useState(false)
  const [tech_na, setTech_na] = useState("")
  const [as_tick, setAs_tick] = useState("")
  const [as_tech, setAs_tech] = useState("")
  const [req_name, setReq_name] = useState("")
  const [req_priority_name, setReq_priority_name] = useState("")
  const [Ac, setAc] = useState(false)
  const userAttributes = []
  const userAttributes2 = []
  const delet_req = async(e)=>{
     const resp = axios.post('http://10.3.5.115:5000/delete_req_name',[e])
     if(resp){
      alert('success')
      window.location.reload(true);
    }
  }
  countAct1.map((e, lis) => {
    userAttributes.push({
      tik_num: e['ticket_num'],
      prob: e['req_type'],
      tech_sup: e['tech_supp_id'],
      date_st: e['date_time'],
      stus: e['status']
    })
  })
  req_list_type.map((e, lis) => {
    userAttributes2.push({
      req_name: e['name'],
      priy: e['priority'],
      stus: e['status'],
      action : <button className="btn btn-danger" onClick={() => delet_req(e['id'])}>Delete</button>
    })
  })
  const data = {
    columns: [
      {
        label: "Ticket Number",
        field: "tik_num",
        sort: "asc",
        width: 150,
      },
      {
        label: "Problem",
        field: "prob",
        sort: "asc",
        width: 270,
      },
      {
        label: "Tech Support",
        field: "tech_sup",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "date_st",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: 'stus',
        width: 100,
      },
    ],
    rows: userAttributes
  };
  const data2 = {
    columns: [
      {
        label: "Request Name",
        field: "req_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Priority",
        field: "priy",
        sort: "asc",
        width: 270,
      },
      {
        label: "Status",
        field: "stus",
        sort: "asc",
        width: 270,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 150,
      }
    ],
    rows: userAttributes2,
  };
  const assign = async () => {
    const res = axios.post('http://10.3.5.115:5000/assign_tiket', [as_tech, as_tick])
    if (res) {
      alert('Assigned')
    }
  }
  const list_tech_all = async () => {
    const resp = await axios.get('http://10.3.5.115:5000/list_tech_all')
    if (resp) {
      SetTechsupp(resp.data)
    }
  }
  const list_tech_all2 = async () => {
    const resp = await axios.get('http://10.3.5.115:5000/list_tech_all2')
    if (resp) {
      SetTechsupp2(resp.data)
    }
  }
  const list_ticket_all = async () => {
    const resp = await axios.post('http://10.3.5.115:5000/list_ticket_all')
    if (resp) {
      SetCountact(resp.data.length)
      SetCountact1(resp.data)
    }
  }
  const list_request_all = async () => {
    const resp = await axios.post('http://10.3.5.115:5000/list_request_all')
    if (resp) {
       SetReq_list_type(resp.data)
    }
  }
  const list_ticket_all_act = async () => {
    const resp = await axios.post('http://10.3.5.115:5000/list_ticket_all_act')
    if (resp) {
      SetCountact_lis(resp.data)
    }
  }
  const list_pend_ticket_all = async () => {
    const resp = await axios.post('http://10.3.5.115:5000/list_pend_ticket_all')
    if (resp) {
      SetCountpen(resp.data.length)
    }
  }
  const list_closed_ticket_all = async () => {
    const resp = await axios.post('http://10.3.5.115:5000/list_close_ticket_all')
    if (resp) {
      SetCountClo(resp.data.length)
    }
  }
  const reset = async (e) => {
    setAc(true)
    setAs_tick(e.target.value)
  }
  const deletu = (e) => {
    axios.post('http://10.3.5.115:5000/delete', [e]).then((res) => {
      window.location.reload(true);
    })
  }
  const passive = (e, j) => {
    const res = axios.post('http://10.3.5.115:5000/passive', [e, j])
    if (res) {
      window.location.reload(true);
    }
  }
  const create_user = async () => {
    const data = [email, password, username, role]
    const res = axios.post('http://10.3.5.115:5000/create_user', [email, password, username, role])
    if (res) { alert('User Created') }
  }
  const create_req_type = async () => 
  {
    const data = [req_priority_name,req_name]
    const res = await axios.post('http://10.3.5.115:5000/create_req_type',[req_name,req_priority_name])
    if(res)
    {
      alert('success')
    }
  }
  useEffect(() => {
    const sess = localStorage.getItem('session')
    const li = JSON.parse(sess)
    let ids = li[0].id
    list_ticket_all()
    list_pend_ticket_all()
    list_closed_ticket_all()
    list_tech_all()
    list_tech_all2()
    list_ticket_all_act()
    list_request_all()
  }, [])
  const logout = () => {
    localStorage.removeItem('session')
    window.location.reload(true);
  }
  return (
    <div className="min-h-full">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="test">
          ECX
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="test"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Manage Account
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="">
                  <button onClick={logout} className='dropdown-item'>Logout</button>
                </a>
                <a className="dropdown-item" href="">
                  <button className='dropdown-item'>Change Password</button>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className='row'>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{countAct > 0 ? countAct : '0'}</h3>
              <p>Total Jobs</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{countAct > 0 ? countAct : '0'}</h3>
              <p>Active Jobs</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{countPen > 0 ? countPen : '0'}</h3>
              <p>Pending Jobs</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{countClo > 0 ? countClo : '0'}</h3>
              <p>Closed Jobs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div></div>
        <div className="card-header">
          <h3 className="card-title"><strong>Manage User</strong></h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={create_user}>
            <div className="row">
              <div className="col-md-3">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
              </div>
              <div className="col-md-3">
                <label>User Name</label>
                <input type="text" className="form-control" value={username} onChange={(e) => { setUsername(e.target.value) }} required></input>
              </div>
              <div className="col-md-3">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
              </div>
              <div className="col-md-3">
                <label>Role</label>
                <select className="form-control" onChange={(e) => { setRole(e.target.value) }}>
                  <option>Select User Type</option>
                  <option value={'Super'} key={1}>Super</option>
                  <option value={'Admin'} key={2}>Admin</option>
                </select>
                <button className="btn btn-success">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card">
        <div></div>
        <div className="card-header">
          <h3 className="card-title"><strong>Manage Request Type</strong></h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={create_req_type}>
            <div className="row">
              <div className="col-md-3">
                <label>Request Name</label>
                <input type="text" placeholder='Request Name Here' className="form-control" value={req_name} onChange={(e) => { setReq_name(e.target.value) }} required></input>
              </div>
              <div className="col-md-3">
                <label>Request Priority</label>
              <select className="form-control" value={req_name} onChange={(e) => { setReq_priority_name(e.target.value) }}>
                <option>Select Priority</option>
                <option value={'1'} key={1}>1</option>
                <option value={'2'} key={2}>2</option>
                <option value={'3'} key={3}>3</option>
              </select>
                <button className="btn btn-success">Save</button>
              </div>
            </div>
          </form>
          <div className="card-body">
            <MDBDataTable striped bordered small data={data2} />
          </div>
        </div>
      </div>
      <div className="card">
        <div></div>
        <div className="card-header">
          <h3 className="card-title"><strong>List of Tech Support</strong></h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody >
              {
                techsupp.map((lists, i) => (
                  <tr>
                    <td>{lists.id}</td>
                    <td>{lists.Full_name}</td>
                    <td>{lists.is_act}</td>
                    <td>
                      <button className='btn btn-success' onClick={() => (passive(lists.id, lists.is_act))}>{lists.is_act === 'Active' ? 'Passive' : 'Active'}</button>
                      <button className='btn btn-danger' onClick={() => (deletu(lists.id))}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div></div>
        <div className="card-header">
          <h3 className="card-title"><strong>Ticket List</strong></h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <MDBDataTable striped bordered small data={data} />
        </div>
      </div>
      <div className="card">
        <div></div>
        <div className="card-header">
          <h3 className="card-title"><strong>Assign Ticket</strong></h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className='row'>
            <div className="col-md-3">
              <label>Ticket Number</label>
              <select className="form-control" onChange={(e) => (reset(e))}>
                <option value={'ECX-123'} selected={true}>Ticket Number</option>
                {
                  countAct_lis.map((listsac, i) => (
                    <option key={listsac.id} value={listsac.id}>{listsac.ticket_num}</option>
                  ))
                }
              </select>
            </div>
            {
              Ac &&
              <div className="col-md-3">
                <label>Tech Support</label>
                <select className="form-control" onChange={(e) => (setAs_tech(e.target.value))} required>
                  <option selected={true} disabled={true}>Select Tech Support</option>
                  {
                    techsupp2.map((list) =>
                    (
                      <option value={list.id} key={list.id}>{list.Full_name}</option>
                    ))
                  }
                </select>
                <div className="col-md-3">
                  <label></label>
                  <div></div>
                  <button className="btn btn-success" onClick={assign}>Assign</button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin