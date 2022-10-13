import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { MDBDataTable } from "mdbreact";
function Dashboard() {
    const [frm, setFrm] = useState(false)
    const [frm2, setFrm2] = useState(false)
    const [act_list, setAct_list] = useState([])
    const [act_list_rpt, setAct_list_rpt] = useState([])
    const [pend_list, setPend_list] = useState([])
    const [statu, setStatu] = useState("")
    const [id_pro, setId_pro] = useState("")
    const [soln, setSoln] = useState("")
    const [ticket_id, setTicket_id] = useState("")
    const [countAct, SetCountact] = useState("")
    const [countPen, SetCountpen] = useState("")
    const [countClo, SetCountClo] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [techsupName, setTechsuName] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [rep_name, setRep_name] = useState("")
    const [emp_name, setEmp_name] = useState("")
    const [expo_datas, setExpo_datas] = useState([])
    const [user_select, setUser_select] = useState(false)
    const [get_repo, setGet_repo] = useState(false)
    const [users_data, setUsers_data] = useState([])
    const userAttributes = []
    act_list_rpt.map((e, lis) => {
        userAttributes.push({
          tik_num: e['ticket_num'],
          prob: e['req_type'],
          tech_id: e['tech_supp_id'],
          date_st: e['date_time'],
          stus: e['status']
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
            label: "Tech Supp Id",
            field: "tech_id",
            sort: "asc",
            width: 270,
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
    var today = new Date()
    const ticke = e => {
        setFrm(true)
        setTicket_id(e.target.value)
    }
    const ticke2 = e => {
        setFrm2(true)
        setTicket_id(e.target.value)
    }
    const list_ticket = async (ids) => {
        const tech_id = ids
        const resp = await axios.post('http://10.3.5.115:5000/list_ticket_id', [ids])
        if (resp) {
            setAct_list(resp.data)
            SetCountact(resp.data.length)
            find_emp_name(resp.data[0].emp_id)
        }
    }
    const list_ticket_rpt = async (ids) => {
        const tech_id = ids
        const resp = await axios.post('http://10.3.5.115:5000/list_ticket_rpt_id', [ids])
        if (resp) 
        {
            setAct_list_rpt(resp.data)
        }
    }
    const find_emp_name = async (em_id) => {
        const resp = await axios.post('http://10.3.5.115:5000/employee_name', [em_id])
        if (resp) {
            setEmp_name(resp.data[0].name)
        }
    }
    const list_pend_ticket = async (ids) => {
        const tech_id = ids
        const resp = await axios.post('http://10.3.5.115:5000/list_pend_ticket', [ids])
        if (resp) {
            setPend_list(resp.data)
            SetCountpen(resp.data.length)
            find_emp_name(resp.data[0].emp_id)
        }
    }
    const list_closed_ticket = async (ids) => {
        const tech_id = ids
        const resp = await axios.post('http://10.3.5.115:5000/list_close_ticket', [ids])
        if (resp) {
            SetCountClo(resp.data.length)
        }
    }
    const mgm_ticket = async () => {
        const sess = localStorage.getItem('session')
        const li = JSON.parse(sess)
        let ids = li[0].id
        const data = [statu, id_pro, soln, ticket_id, ids]
        const res = await axios.post('http://10.3.5.115:5000/change_tick', data)
        if (res) { alert('ticket chaged') }
    }
    const mgm_ticket2 = async () => {
        const data = [id_pro, soln, ticket_id]
        const res = await axios.post('http://10.3.5.115:5000/change_tick2', data)
        if (res) { alert('ticket chaged') }
    }
    const downld = async (e) => {
        const res = await axios.post('http://10.3.5.115:5000/download_file', [e])
        if (res) {
            alert("test")
        }
    }
    useEffect(() => {
        const sess = localStorage.getItem('session')
        if (Object.keys(sess).length === 0) {
            localStorage.removeItem('session')
        }
        const li = JSON.parse(sess)
        let ids = li[0].id
        setRep_name(ids)
        setTechsuName(li[0].Full_name)
        list_ticket(ids)
        list_ticket_rpt(ids)
        list_pend_ticket(ids)
        list_closed_ticket(ids)
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
                                    <button onClick={() => { setShowModal(true) }} className='dropdown-item'>Change Password</button>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='row'>
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
                <div className="card-header">
                    <h3 className="card-title"><strong>Online</strong></h3>
                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-outline mb-4">
                        <select className="form-control" value={ticket_id} onChange={ticke} >
                            <option value={'ECX-123'}>Ticket Number</option>
                            {
                                act_list.map((listsac, i) => (
                                    <option key={listsac.id} value={listsac.id}>{listsac.ticket_num}</option>
                                ))
                            }
                        </select>
                        <label className="form-label" >Choose Ticket</label>
                    </div>
                    {
                        frm &&
                        <form onSubmit={mgm_ticket} >
                            <div className="form-outline mb-4">
                                <textarea className="form-control" rows="4" value={id_pro} onChange={(e) => (setId_pro(e.target.value))}></textarea>
                                <label className="form-label" >Problem Identified</label>
                            </div>

                            <div className="form-outline mb-4">
                                <textarea className="form-control" rows="4" value={soln} onChange={(e) => (setSoln(e.target.value))}></textarea>
                                <label className="form-label" >Solution Given</label>
                            </div>
                            <div className="form-outline mb-4">
                                <select type="number" className="form-control" value={statu} onChange={(e) => { setStatu(e.target.value) }}>
                                    <option>Select Status</option>
                                    <option value={'Closed'} key={'1'}>Close-Ticket</option>
                                    <option value={'Pend'} key={'2'}>Pend-Ticket</option>
                                </select>
                                <label className="form-label">Change Status</label>
                            </div>
                            <button className="btn btn-success">Done!</button>
                        </form>
                    }

                </div>
            </div>
            <div className="card">
                <div></div>
                <div className="card-header">
                    <h3 className="card-title"><strong>Ticket Detail</strong></h3>
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
                                <th>Employee Name</th>
                                <th>Ticket_Num</th>
                                <th>Problem</th>
                                <th>Add Info</th>
                                <th>Priority</th>
                                <th>Attachment</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                act_list.map((lists, i) => (
                                    <tr>
                                        <td>{emp_name}</td>
                                        <td>{lists.ticket_num}</td>
                                        <td>{lists.req_type}</td>
                                        <td>{lists.add_info}</td>
                                        <td>{lists.req_prio}</td>
                                        <td><button onClick={() => downld(lists.attach)}>{lists.attach}</button></td>
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
                    <h3 className="card-title"><strong>Pende Ticket</strong></h3>
                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <input className="form-control" type="text" placeholder="Search.." />
                    <br />
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Ticket_Num</th>
                                <th>Problem</th>
                                <th>Add Info</th>
                                <th>Priority</th>
                                <th>Attachment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                pend_list.map((lists, i) => (
                                    <tr>
                                        <td>{emp_name}</td>
                                        <td>{lists.ticket_num}</td>
                                        <td>{lists.req_type}</td>
                                        <td>{lists.add_info}</td>
                                        <td>{lists.req_prio}</td>
                                        <td><button onClick={() => downld(lists.attach)}>{lists.attach}</button></td>
                                        <td>
                                            <select className="form-control" onChange={ticke2}>
                                                <option>Select Action</option>
                                                <option value={lists.id}>Close</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="form-outline mb-4"></div>
                    {
                        frm2 &&
                        <form onSubmit={mgm_ticket2} >
                            <div className="form-outline mb-4">
                                <textarea className="form-control" rows="4" value={id_pro} onChange={(e) => (setId_pro(e.target.value))}></textarea>
                                <label className="form-label" >Problem Identified</label>
                            </div>

                            <div className="form-outline mb-4">
                                <textarea className="form-control" rows="4" value={soln} onChange={(e) => (setSoln(e.target.value))}></textarea>
                                <label className="form-label" >Solution Given</label>
                            </div>
                            <button className="btn btn-success">Done!</button>
                        </form>
                    }
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
        </div>
    )
}

export default Dashboard